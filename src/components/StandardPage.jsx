import React from 'react';

export function StandardPage({ page, fieldMap, formData, recordCollections, onFieldChange }) {
  const isFieldVisible = (field) => {
    if (!field.visibleWhen) {
      return true;
    }

    return formData[field.visibleWhen.field] === field.visibleWhen.equals;
  };

  const resolveFieldOptions = (field) => {
    if (field.optionsSource?.type === 'lines-from-field') {
      return (formData[field.optionsSource.field] ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (field.optionsSource?.type === 'record-field') {
      const records = recordCollections[field.optionsSource.recordPage] ?? [];
      const values = records
        .map((record) => record[field.optionsSource.field] ?? '')
        .map((item) => item.trim())
        .filter(Boolean);

      return field.optionsSource.dedupe ? [...new Set(values)] : values;
    }

    return field.options ?? [];
  };

  return (
    <section className="standard-page">
      <div className="standard-page__header">
        <h3>{page.title}</h3>
        {page.description ? <p>{page.description}</p> : null}
      </div>

      <div className="standard-page__fields">
        {page.fields?.map((fieldKey) => {
          const field = fieldMap[fieldKey];
          const resolvedOptions = field ? resolveFieldOptions(field) : [];

          if (!field || !isFieldVisible(field)) {
            return null;
          }

          return (
            <label key={fieldKey} className="field-card">
              <span className="field-card__label">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  className="field-card__control field-card__control--textarea"
                  value={formData[fieldKey] ?? ''}
                  onChange={(event) => onFieldChange(fieldKey, event.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  className="field-card__control"
                  value={formData[fieldKey] ?? ''}
                  onChange={(event) => onFieldChange(fieldKey, event.target.value)}
                >
                  {resolvedOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="field-card__control"
                  type="text"
                  value={formData[fieldKey] ?? ''}
                  onChange={(event) => onFieldChange(fieldKey, event.target.value)}
                />
              )}
            </label>
          );
        })}
      </div>
    </section>
  );
}
