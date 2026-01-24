import { SortingDirection, SortingProperty } from "@bernardo-mg/request";

export function mergeProperties(properties: SortingProperty[], defaultProperties: SortingProperty[]): SortingProperty[] {
  let sortFields;

  // Remove unsorted fields
  const validSortings = properties.filter(f => f.direction != SortingDirection.Unsorted);
  if (validSortings.length === 0) {
    // Use default sorts if no sorting was received
    sortFields = defaultProperties;
  } else {
    // Merge default sorting with the received one

    // Apply default sortings to those fields which are not sorted
    const sortedProperties = validSortings.map(f => f.property);
    const defaultSortFields = defaultProperties.filter(f =>
      (f.direction == SortingDirection.Unsorted) || (!sortedProperties.includes(f.property))
    );

    sortFields = validSortings.concat(defaultSortFields);
  }

  // Remove duplicates
  return sortFields.filter((field, index, self) =>
    index === self.findIndex(f => f.property === field.property)
  );
}
