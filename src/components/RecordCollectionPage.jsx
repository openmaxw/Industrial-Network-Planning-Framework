import React from 'react';

export function RecordCollectionPage({ page, fieldMap, records, draftRecord, onDraftChange, onAddRecord }) {
  return (
    <section className="standard-page">
      <div className="standard-page__header">
        <h3>{page.title}</h3>
        <p>{page.description}</p>
      </div>

      {page.sections?.map((section) => {
        if (section.kind === 'record-list') {
          return (
            <section key={section.key} className="section-card">
              <h4>{section.title}</h4>
              <div className="record-list">
                {records.length === 0 ? (
                  <p className="empty-tip">暂无记录</p>
                ) : (
                  records.map((record, index) => (
                    <div key={`${page.title}-${index}`} className="record-card">
                      <strong>记录 {index + 1}</strong>
                      {page.fields.map((fieldKey) => (
                        <p key={fieldKey}>
                          {fieldMap[fieldKey]?.label}：{record[fieldKey] || '（空）'}
                        </p>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        }

        if (section.kind === 'record-editor') {
          return (
            <section key={section.key} className="section-card">
              <h4>{section.title}</h4>
              <div className="standard-page__fields">
                {page.fields?.map((fieldKey) => {
                  const field = fieldMap[fieldKey];

                  if (!field) {
                    return null;
                  }

                  return (
                    <label key={fieldKey} className="field-card">
                      <span className="field-card__label">{field.label}</span>
                      <input
                        className="field-card__control"
                        type="text"
                        value={draftRecord[fieldKey] ?? ''}
                        onChange={(event) => onDraftChange(fieldKey, event.target.value)}
                      />
                    </label>
                  );
                })}
              </div>

              <div className="record-actions">
                <button type="button" className="primary-button" onClick={onAddRecord}>
                  添加记录
                </button>
              </div>
            </section>
          );
        }

        return null;
      })}
    </section>
  );
}
