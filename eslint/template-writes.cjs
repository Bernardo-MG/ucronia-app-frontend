const { readFileSync } = require('node:fs');
const { dirname, resolve } = require('node:path');
const {
  CombinedRecursiveAstVisitor, ImplicitReceiver, KeyedRead, LiteralPrimitive,
  ParsedEventType, PropertyRead, parseTemplate
} = require('@angular-eslint/bundled-angular-compiler');

const ASSIGNMENT_OPERATORS = new Set([
  '=', '+=', '-=', '*=', '/=', '%=', '**=', '&&=', '||=', '??='
]);

function literalString(node) {
  if (node?.type === 'Literal' && typeof node.value === 'string') return node.value;
  if (node?.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis[0].value.cooked;
}

class TemplateWrites extends CombinedRecursiveAstVisitor {
  names = new Set();
  unknown = false;

  record(target) {
    if (target instanceof PropertyRead && target.receiver instanceof ImplicitReceiver) {
      this.names.add(target.name);
    } else if (target instanceof KeyedRead && target.receiver instanceof ImplicitReceiver) {
      if (target.key instanceof LiteralPrimitive) {
        this.names.add(String(target.key.value));
      } else {
        this.unknown = true;
      }
    }
  }

  visitBinary(expression, context) {
    if (ASSIGNMENT_OPERATORS.has(expression.operation)) this.record(expression.left);
    super.visitBinary(expression, context);
  }

  visitBoundEvent(event) {
    if (event.type === ParsedEventType.TwoWay) this.record(event.handler.ast);
    super.visitBoundEvent(event);
  }
}

module.exports = function getTemplateWrites(metadata, filename) {
  const writes = new TemplateWrites();
  if (metadata?.type !== 'ObjectExpression') {
    writes.unknown = true;
    return writes;
  }

  for (const property of metadata.properties) {
    if (property.type !== 'Property' || property.computed) {
      writes.unknown = true;
      continue;
    }
    const key = property.key.name ?? property.key.value;
    if (key !== 'template' && key !== 'templateUrl' && key !== 'host') continue;

    try {
      if (key === 'host') {
        // Host listeners can assign component fields through Angular expressions.
        if (property.value.type !== 'ObjectExpression' || property.value.properties.some(binding =>
          binding.type !== 'Property' || binding.computed ||
          String(binding.key.name ?? binding.key.value).startsWith('(')
        )) writes.unknown = true;
        continue;
      }
      const value = literalString(property.value);
      if (value === undefined) {
        writes.unknown = true;
        continue;
      }
      const templatePath = key === 'templateUrl' ? resolve(dirname(filename), value) : filename;
      const template = key === 'templateUrl' ? readFileSync(templatePath, 'utf8') : value;
      const parsed = parseTemplate(template, templatePath);
      if (parsed.errors?.length) writes.unknown = true;
      for (const node of parsed.nodes) writes.visit(node);
    } catch {
      writes.unknown = true;
    }
  }
  return writes;
};
