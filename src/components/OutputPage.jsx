import React from 'react';

export function OutputPage({ page, outputConfig, fieldMap, formData, recordCollections }) {
  const renderKeyValueSummary = (section) => {
    const fieldKeys = outputConfig?.[section.key] ?? [];

    return (
      <section key={section.key} className="section-card">
        <h4>{section.title}</h4>
        <div className="output-grid">
          {fieldKeys.map((fieldKey) => (
            <div key={fieldKey} className="output-item">
              <span className="output-item__label">{fieldMap[fieldKey]?.label ?? fieldKey}</span>
              <strong>{formData[fieldKey] || '（空）'}</strong>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderRecordSummary = (section) => {
    const config = outputConfig?.[section.key];
    const records = recordCollections[config?.recordPage] ?? [];

    return (
      <section key={section.key} className="section-card">
        <h4>{section.title}</h4>
        <div className="record-list">
          {records.length === 0 ? (
            <p className="empty-tip">暂无记录</p>
          ) : (
            records.map((record, index) => (
              <div key={`${section.key}-${index}`} className="record-card">
                <strong>记录 {index + 1}</strong>
                {config.fields.map((fieldKey) => (
                  <p key={fieldKey}>
                    {fieldMap[fieldKey]?.label ?? fieldKey}：{record[fieldKey] || '（空）'}
                  </p>
                ))}
              </div>
            ))
          )}
        </div>
      </section>
    );
  };

  return (
    <section className="standard-page">
      <div className="standard-page__header">
        <h3>{page.title}</h3>
        <p>{page.description}</p>
      </div>

      {page.sections?.map((section) => {
        if (section.kind === 'key-value-summary') {
          return renderKeyValueSummary(section);
        }

        if (section.kind === 'record-summary') {
          return renderRecordSummary(section);
        }

        return null;
      })}
    </section>
  );
}
