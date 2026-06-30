import React from 'react';

export function OutputPage({ page, outputConfig, fieldMap, formData, recordCollections }) {
  const formatValue = (value) => (value === undefined || value === null || value === '' ? '未提供' : value);
  const joinValues = (parts) => parts.filter(Boolean).join('，');
  const buildRecordJoinText = (line) => {
    const sourceRecords = recordCollections[line.recordPage] ?? [];
    return sourceRecords
      .map((record) =>
        (line.fields ?? [])
          .map((fieldKey) => {
            const value = record[fieldKey];
            if (!value) {
              return null;
            }
            const prefix = line.labels === false ? '' : `${fieldMap[fieldKey]?.label ?? fieldKey}：`;
            return `${prefix}${value}`;
          })
          .filter(Boolean)
          .join('，'),
      )
      .filter(Boolean)
      .join('；');
  };
  const buildFieldJoinText = (line) =>
    (line.fields ?? [])
      .map((fieldKey) => {
        const value = formData[fieldKey];
        if (!value) {
          return null;
        }
        const prefix = line.labels === false ? '' : `${fieldMap[fieldKey]?.label ?? fieldKey}：`;
        return `${prefix}${value}`;
      })
      .filter(Boolean)
      .join('，');
  const buildMultiRecordFieldJoinText = (line) =>
    (line.recordPages ?? [])
      .flatMap((recordPage) =>
        ((recordCollections[recordPage] ?? []).map((record) => {
          const segments = (line.fields ?? [])
            .map((fieldKey) => {
              const value = record[fieldKey];
              if (!value) {
                return null;
              }
              const prefix = line.labels === false ? '' : `${fieldMap[fieldKey]?.label ?? fieldKey}：`;
              return `${prefix}${value}`;
            })
            .filter(Boolean);

          if (segments.length === 0) {
            return null;
          }

          const pageLabel = line.showPageLabel ? `${recordPage}：` : '';
          return `${pageLabel}${segments.join('，')}`;
        }))
      )
      .filter(Boolean)
      .join('；');
  const resolveLineText = (line) => {
    if (line.type === 'record-join') {
      return `${line.label}：${buildRecordJoinText(line) || '未提供'}`;
    }

    if (line.type === 'field-join') {
      return `${line.label}：${buildFieldJoinText(line) || '未提供'}`;
    }

    if (line.type === 'multi-record-field-join') {
      return `${line.label}：${buildMultiRecordFieldJoinText(line) || '未提供'}`;
    }

    if (line.type === 'record-count') {
      const records = (line.recordPage && recordCollections[line.recordPage]) || [];
      return `${line.label}：${records.length}`;
    }

    if (line.type === 'template') {
      const segments = (line.parts ?? [])
        .map((part) => {
          if (part.kind === 'text') {
            return part.value;
          }
          if (part.kind === 'field') {
            const value = formData[part.key];
            if (value === undefined || value === null || value === '') {
              return null;
            }
            return String(value).trim();
          }
          if (part.kind === 'record-join') {
            return buildRecordJoinText(part);
          }
          if (part.kind === 'field-join') {
            return buildFieldJoinText(part);
          }
          return '';
        })
        .map((segment) => (typeof segment === 'string' ? segment.trim() : segment))
        .filter((segment) => segment !== null && segment !== undefined && segment !== '');
      return segments.join('') || '未提供';
    }

    return line.text ?? '';
  };

  const renderTextSummary = (section) => {
    const config = outputConfig?.[section.key];
    const lines = config?.lines?.map(resolveLineText) ?? [];
    const paragraphs = config?.paragraphs?.map(resolveLineText) ?? [];
    const bullets = config?.bullets?.map(resolveLineText) ?? [];

    return (
      <section key={section.key} className="section-card">
        <h4>{section.title}</h4>
        <div className="record-card">
          {lines.map((line, index) => (
            <p key={`${section.key}-${index}`}>{line}</p>
          ))}
          {paragraphs.map((paragraph, index) => (
            <p key={`${section.key}-p-${index}`}>{paragraph}</p>
          ))}
          {bullets.length > 0 ? (
            <ul>
              {bullets.map((bullet, index) => (
                <li key={`${section.key}-b-${index}`}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {config?.codeBlocks?.map((block, index) => (
            <pre key={`${section.key}-code-${index}`} className="record-card">
              <code>{resolveLineText(block)}</code>
            </pre>
          ))}
        </div>
      </section>
    );
  };

  const renderKeyValueSummary = (section) => {
    const fieldKeys = outputConfig?.[section.key] ?? [];

    return (
      <section key={section.key} className="section-card">
        <h4>{section.title}</h4>
        <div className="output-grid">
          {fieldKeys.map((fieldKey) => (
            <div key={fieldKey} className="output-item">
              <span className="output-item__label">{fieldMap[fieldKey]?.label ?? fieldKey}</span>
              <strong>{formatValue(formData[fieldKey])}</strong>
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
                    {fieldMap[fieldKey]?.label ?? fieldKey}：{formatValue(record[fieldKey])}
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

        if (section.kind === 'text-summary') {
          return renderTextSummary(section);
        }

        return null;
      })}
    </section>
  );
}
