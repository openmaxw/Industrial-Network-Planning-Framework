export function buildInitialFormData(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([fieldKey, field]) => [fieldKey, field.defaultValue ?? ''])
  );
}

export function getPage(methodology, pageKey) {
  if (methodology.systemPages?.[pageKey]) {
    return methodology.systemPages[pageKey];
  }

  return methodology.pages[pageKey] ?? null;
}

export function getActiveFieldEntries(page, formData) {
  if (!page?.fields) {
    return [];
  }

  return page.fields.map((fieldKey) => ({
    key: fieldKey,
    value: formData[fieldKey] ?? '',
  }));
}

export function buildRecordFromDraft(fieldKeys, draft) {
  return Object.fromEntries(fieldKeys.map((fieldKey) => [fieldKey, draft[fieldKey] ?? '']));
}

export function buildEmptyDraft(fieldKeys) {
  return Object.fromEntries(fieldKeys.map((fieldKey) => [fieldKey, '']));
}
