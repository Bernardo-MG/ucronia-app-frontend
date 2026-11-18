const getTemplateWrites = require('./template-writes.cjs');

const FIELD_TYPES = new Set(['PropertyDefinition', 'AccessorProperty']);
const GROUP_NAMES = ['injected dependencies', 'inputs', 'outputs', 'public fields', 'protected fields', 'private fields'];

function unwrap(node) {
  while (node && ['ChainExpression', 'TSAsExpression', 'TSNonNullExpression', 'TSSatisfiesExpression', 'TSTypeAssertion'].includes(node.type)) {
    node = node.expression;
  }
  return node;
}

function memberName(node) {
  const key = node.key ?? node.property;
  if (!node.computed && ['Identifier', 'PrivateIdentifier'].includes(key.type)) {
    return key.name;
  }
  return key.type === 'Literal' ? String(key.value) : undefined;
}

function isAccessor(member) {
  return member.type === 'MethodDefinition' && ['get', 'set'].includes(member.kind);
}

module.exports = {
  meta: {
    type: 'suggestion',
    schema: [],
    messages: {
      order: 'Place "{{name}}" in alphabetical order within {{group}}, before later field groups and methods.',
      pair: 'Keep both accessors for "{{name}}" adjacent.',
      spacing: 'Expected {{count}} blank line(s) {{where}}.',
      readonly: 'Declare "{{name}}" readonly if consumers do not reassign its reference.'
    }
  },
  create(context) {
    const source = context.sourceCode;
    const angularImports = new Map();
    const classes = [];

    function angularName(node) {
      if (node?.type === 'Identifier') {
        let scope = source.getScope(node);
        while (scope && !scope.set.has(node.name)) {
          scope = scope.upper;
        }
        return angularImports.get(scope?.set.get(node.name)?.defs[0]?.node);
      }
      if (node?.type === 'MemberExpression' && angularName(node.object) === '*') {
        return memberName(node);
      }
      if (node?.type === 'MemberExpression' && memberName(node) === 'required') {
        return angularName(node.object);
      }
    }

    function decoratorNames(member) {
      return (member.decorators ?? []).map(({ expression }) =>
        angularName(expression.type === 'CallExpression' ? expression.callee : expression)
      );
    }

    function fieldGroup(member) {
      const value = unwrap(member.value);
      const factory = value?.type === 'CallExpression' ? angularName(value.callee) : undefined;
      const decorators = decoratorNames(member);
      if (factory === 'inject') return 0;
      if (['input', 'model'].includes(factory) || decorators.includes('Input')) return 1;
      if (factory === 'output' || decorators.includes('Output')) return 2;
      if (member.accessibility === 'protected') return 4;
      if (member.accessibility === 'private' || member.key.type === 'PrivateIdentifier') return 5;
      return 3;
    }

    function declarationStart(member) {
      const first = source.getFirstToken(member);
      const comments = source.getCommentsBefore(member);
      // Same-line comments belong to the preceding declaration.
      return comments.find(comment => source.getTokenBefore(comment, { includeComments: true })
        ?.loc.end.line < comment.loc.start.line) ?? first;
    }

    function checkSpacing(left, right, count, where) {
      const blankLines = source.lines.slice(left.loc.end.line, right.loc.start.line - 1)
        .filter(line => !line.trim()).length;
      if (blankLines !== count || right.loc.start.line <= left.loc.end.line) {
        context.report({ loc: right.loc, messageId: 'spacing', data: { count, where } });
      }
    }

    function visitWrites(node, inConstructor, recordWrite) {
      if (['ArrowFunctionExpression', 'FunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        inConstructor = false;
      }
      if (node.type === 'AssignmentExpression') {
        recordTarget(node.left, inConstructor && node.operator === '=', recordWrite);
      } else if (node.type === 'UpdateExpression' || (node.type === 'UnaryExpression' && node.operator === 'delete')) {
        recordTarget(node.argument, false, recordWrite);
      } else if (node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
        recordTarget(node.left, false, recordWrite);
      }
      for (const key of source.visitorKeys[node.type] ?? []) {
        const children = Array.isArray(node[key]) ? node[key] : [node[key]];
        children.filter(Boolean).forEach(child => visitWrites(child, inConstructor, recordWrite));
      }
    }

    function recordTarget(target, initialization, recordWrite) {
      target = unwrap(target);
      if (!target) return;
      switch (target.type) {
        case 'MemberExpression':
          recordWrite(target, initialization);
          break;
        case 'ArrayPattern':
          target.elements.forEach(element => recordTarget(element, false, recordWrite));
          break;
        case 'ObjectPattern':
          target.properties.forEach(property => recordTarget(property.value ?? property.argument, false, recordWrite));
          break;
        case 'AssignmentPattern':
        case 'RestElement':
          recordTarget(target.left ?? target.argument, false, recordWrite);
          break;
      }
    }

    function checkReadonly(component, fields, metadata, externalWrites) {
      const initialized = new Set();
      const reassigned = new Set();

      function recordWrite(target, initialization) {
        const receiver = unwrap(target.object);
        const instance = receiver.type === 'ThisExpression';
        if (!instance && !(receiver.type === 'Identifier' && receiver.name === component.id?.name)) return;

        const name = memberName(target);
        if (name === undefined) {
          fields.forEach(field => reassigned.add(field.name));
        } else if (instance && initialization) {
          initialized.add(name);
        } else {
          reassigned.add(name);
        }
      }

      for (const member of component.body.body) {
        if (member.kind === 'constructor' && member.value.body) {
          visitWrites(member.value.body, true, recordWrite);
        } else {
          visitWrites(member, false, recordWrite);
        }
      }
      const templateWrites = getTemplateWrites(metadata, context.physicalFilename);
      for (const { member, name, group } of fields) {
        if (member.type !== 'PropertyDefinition' || member.readonly || member.declare ||
            member.override || member.decorators?.length) continue;
        if (externalWrites.has(name)) continue;
        const templateCanWrite = member.accessibility !== 'private' &&
          member.key.type !== 'PrivateIdentifier' && !member.static;
        if (templateCanWrite && (templateWrites.unknown || templateWrites.names.has(name))) continue;
        if (!reassigned.has(name) && (member.value || initialized.has(name) || group <= 2)) {
          context.report({ node: member.key, messageId: 'readonly', data: { name } });
        }
      }
    }

    function checkComponent(component, externalWrites) {
      const decoratorIndex = decoratorNames(component).indexOf('Component');
      if (decoratorIndex === -1) return;
      const metadata = component.decorators[decoratorIndex].expression.arguments?.[0];
      const body = component.body;
      const members = body.body;
      const opening = source.getFirstToken(body);
      const closing = source.getLastToken(body);
      const first = source.getTokenAfter(opening, { includeComments: true });
      if (first === closing) return;

      checkSpacing(opening, first, 1, 'after the opening brace');
      checkSpacing(source.getTokenBefore(closing, { includeComments: true }), closing, 1, 'before the closing brace');

      const fields = members.flatMap((member, index) => FIELD_TYPES.has(member.type) || isAccessor(member)
        ? [{ member, index, name: memberName(member) ?? source.getText(member.key), group: fieldGroup(member) }]
        : []);
      const accessorGroups = new Map();
      for (const field of fields.filter(({ member }) => isAccessor(member))) {
        const key = JSON.stringify([field.member.static, field.name]);
        const pair = accessorGroups.get(key);
        if (pair) {
          field.group = pair.group = Math.min(field.group, pair.group);
          if (field.index !== pair.index + 1) {
            context.report({ node: field.member.key, messageId: 'pair', data: { name: field.name } });
          }
        } else {
          accessorGroups.set(key, field);
        }
      }

      const fieldsByIndex = new Map(fields.map(field => [field.index, field]));
      const firstMethod = members.findIndex(member => !FIELD_TYPES.has(member.type) && !isAccessor(member));
      let previous;
      for (const field of fields) {
        const { member, index, name, group } = field;
        if ((firstMethod !== -1 && index > firstMethod) ||
            (previous && (group < previous.group ||
              (group === previous.group && name.toLowerCase() < previous.name.toLowerCase())))) {
          context.report({ node: member.key, messageId: 'order', data: { name, group: GROUP_NAMES[group] } });
        }

        const next = members[index + 1];
        if (next) {
          const count = fieldsByIndex.get(index + 1)?.group === group ? 0 : 1;
          const start = declarationStart(next);
          const end = source.getTokenBefore(start, { includeComments: true });
          checkSpacing(end, start, count, 'before the next declaration');
          if (start.type === 'Line' || start.type === 'Block') {
            const firstToken = source.getFirstToken(next);
            const comment = source.getTokenBefore(firstToken, { includeComments: true });
            if (comment.loc.end.line !== firstToken.loc.start.line) {
              checkSpacing(comment, firstToken, 0, 'after the declaration comment');
            }
          }
        }
        previous = field;
      }

      checkReadonly(component, fields, metadata, externalWrites);
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value !== '@angular/core' || node.importKind === 'type') return;
        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportSpecifier' && specifier.importKind !== 'type') {
            angularImports.set(specifier, specifier.imported.name ?? specifier.imported.value);
          } else if (specifier.type === 'ImportNamespaceSpecifier') {
            angularImports.set(specifier, '*');
          }
        }
      },
      'ClassDeclaration, ClassExpression'(node) {
        classes.push(node);
      },
      'Program:exit'(program) {
        if (!classes.length || !angularImports.size) return;
        // A same-file write through another receiver may target a component instance.
        const externalWrites = new Set();
        visitWrites(program, false, target => {
          if (unwrap(target.object).type !== 'ThisExpression') externalWrites.add(memberName(target));
        });
        classes.forEach(component => checkComponent(component, externalWrites));
      }
    };
  }
};
