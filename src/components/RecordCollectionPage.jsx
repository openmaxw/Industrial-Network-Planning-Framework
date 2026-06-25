import React from 'react';

export function RecordCollectionPage({
  page,
  fieldMap,
  records,
  draftRecord,
  selectedIndex,
  onSelectRecord,
  onRecordFieldChange,
  onDraftChange,
  onAddRecord,
}) {
  const currentRecord = records[selectedIndex] ?? {};

  return (
    <section className="standard-page">
      <div className="standard-page__header">
        <h3>{page.title}</h3>
        {page.description ? <p>{page.description}</p> : null}
      </div>

      {page.sections?.map((section) => {
        if (section.kind === 'record-list') {
          return (
            <section key={section.key} className="section-card">
              <div className="table-toolbar">
                <div>
                  <h4>{section.title}</h4>
                </div>
                <button type="button" className="primary-button" onClick={onAddRecord}>
                  + 新增记录
                </button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {page.summaryColumns?.map((fieldKey) => (
                        <th key={fieldKey}>{fieldMap[fieldKey]?.label ?? fieldKey}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr
                        key={`${page.title}-${index}`}
                        className={selectedIndex === index ? 'selectable-row active' : 'selectable-row'}
                        onClick={() => onSelectRecord(index)}
                      >
                        {page.summaryColumns?.map((fieldKey) => (
                          <td key={fieldKey}>{record[fieldKey] || ''}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        }

        if (section.kind === 'record-editor') {
          return (
            <section key={section.key} className="section-card">
              <div className="table-toolbar">
                <div>
                  <h4>{section.title}</h4>
                </div>
              </div>
              <div className="table-wrap">
                <table className="form-table">
                  <tbody>
                    {Array.from({ length: Math.ceil((page.fields?.length ?? 0) / 2) }).map((_, rowIndex) => {
                      const leftFieldKey = page.fields[rowIndex * 2];
                      const rightFieldKey = page.fields[rowIndex * 2 + 1];
                      const leftField = fieldMap[leftFieldKey];
                      const rightField = rightFieldKey ? fieldMap[rightFieldKey] : null;

                      return (
                        <tr key={`${section.key}-${rowIndex}`}>
                          <th>{leftField?.label}</th>
                          <td>{renderEditorControl(leftFieldKey, leftField, currentRecord, onRecordFieldChange)}</td>
                          {rightField ? <th>{rightField.label}</th> : <th />}
                          <td>{rightField ? renderEditorControl(rightFieldKey, rightField, currentRecord, onRecordFieldChange) : null}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        }

        return null;
      })}
    </section>
  );
}

function renderEditorControl(fieldKey, field, record, onRecordFieldChange) {
  if (!field) {
    return null;
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        className="field-card__control field-card__control--textarea"
        value={record[fieldKey] ?? ''}
        onChange={(event) => onRecordFieldChange(fieldKey, event.target.value)}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select
        className="field-card__control"
        value={record[fieldKey] ?? ''}
        onChange={(event) => onRecordFieldChange(fieldKey, event.target.value)}
      >
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      className="field-card__control"
      type="text"
      value={record[fieldKey] ?? ''}
      onChange={(event) => onRecordFieldChange(fieldKey, event.target.value)}
    />
  );
}
