import React from 'react';

export function HomePage({
  methodology,
  methodologyCatalog,
  onSelectMethodology,
  onLoadCase,
  onExportRuntime,
  onExportMethodology,
  onImportMethodology,
}) {
  return (
    <section className="standard-page">
      <section className="section-card">
        <h4>内置方法论</h4>
        <div className="record-list">
          {methodologyCatalog.map((item) => (
            <div key={item.key} className="record-card">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <div className="record-actions">
                <button type="button" className="primary-button" onClick={() => onSelectMethodology(item.methodology)}>
                  载入方法论
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h4>外部方法论配置</h4>
        <div className="home-actions">
          <label className="primary-button primary-button--secondary file-button">
            加载方法论配置 JSON
            <input type="file" accept="application/json,.json" hidden onChange={onImportMethodology} />
          </label>
          {methodology ? (
            <button type="button" className="primary-button" onClick={onExportMethodology}>
              导出当前方法论 JSON
            </button>
          ) : null}
        </div>
      </section>

      {methodology ? (
        <>
          <section className="section-card">
            <h4>当前方法论</h4>
            <div className="output-grid">
              <div className="output-item">
                <span className="output-item__label">键值</span>
                <strong>{methodology.meta.key}</strong>
              </div>
              <div className="output-item">
                <span className="output-item__label">标题</span>
                <strong>{methodology.meta.title}</strong>
              </div>
              <div className="output-item">
                <span className="output-item__label">版本</span>
                <strong>{methodology.meta.version}</strong>
              </div>
            </div>
          </section>

          <section className="section-card">
            <h4>当前数据</h4>
            <div className="home-actions">
              <button type="button" className="primary-button primary-button--secondary" onClick={onExportRuntime}>
                导出当前数据 JSON
              </button>
            </div>
          </section>

          <section className="section-card">
            <h4>案例</h4>
            <div className="record-list">
              {methodology.cases?.map((item) => (
                <div key={item.key} className="record-card">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <div className="record-actions">
                    <button type="button" className="primary-button" onClick={() => onLoadCase(item)}>
                      加载案例
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
}
