import React from 'react';

export function HomePage({ methodology, methodologyCatalog, activeAngle, experienceMode, activeExperienceKey, onSelectMethodology, onLoadCase, onExportMethodology, onExportTemplate, onImportMethodology }) {
  const internalMethodologies = methodologyCatalog.filter((item) => ['isa95', 'iec62443', 'isa95-iec62443'].includes(item.key));

  const standardItems = internalMethodologies.map((item) => ({ ...item, available: true }));
  const scenarioItems = [
    { key: 'scenario-ess', title: '储能项目', available: false },
    { key: 'scenario-auto', title: '汽车产线项目', available: false },
  ];
  const systemItems = [
    { key: 'system-mes', title: 'MES', available: false },
    { key: 'system-fmcs', title: 'FMCS', available: false },
  ];
  const techItems = [
    { key: 'tech-tsn', title: 'TSN', available: false },
    { key: 'tech-5g', title: '5G', available: false },
    { key: 'tech-apl', title: 'APL', available: false },
  ];

  const renderExperienceButtons = (items) => (
    <div className="experience-button-grid">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={[
            'experience-chip',
            activeExperienceKey === item.key ? 'is-active' : '',
            item.available === false ? 'is-disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => {
            if (item.available === false || !item.methodology) {
              return;
            }
            onSelectMethodology(item.methodology, item.key);
          }}
          disabled={item.available === false}
        >
          {item.title}
          {item.available === false ? <span className="experience-chip__tag">待建设</span> : null}
        </button>
      ))}
    </div>
  );

  if (activeAngle === 'intro') {
    return (
      <section className="standard-page">
        <section className="section-card intro-card">
          <h3>平台简介</h3>
          <p>
            本平台用于沉淀、组织与协作工业网络规划相关的经验配置，使不同 FAE、不同项目类型、不同系统对象与不同技术方向下的经验能够被结构化保存、复用与讨论。
          </p>
          <div className="intro-grid">
            <div className="output-item">
              <span className="output-item__label">平台作用</span>
              <strong>沉淀经验配置，统一表达经验</strong>
            </div>
            <div className="output-item">
              <span className="output-item__label">平台价值</span>
              <strong>支持复用、比较、协作与持续优化</strong>
            </div>
            <div className="output-item">
              <span className="output-item__label">适用对象</span>
              <strong>FAE、方案工程师、架构设计人员</strong>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="standard-page">
      {experienceMode === 'internal' ? (
        <>
          <section id="angle-standards" className="section-card">
            <h4>按标准/理论分类</h4>
            {renderExperienceButtons(standardItems)}
          </section>

          <section id="angle-scenarios" className="section-card">
            <h4>按应用场景分类</h4>
            {renderExperienceButtons(scenarioItems)}
          </section>

          <section id="angle-systems" className="section-card">
            <h4>按系统对象分类</h4>
            {renderExperienceButtons(systemItems)}
          </section>

          <section id="angle-tech" className="section-card">
            <h4>按技术方向分类</h4>
            {renderExperienceButtons(techItems)}
          </section>
        </>
      ) : null}

      {experienceMode === 'external' ? (
        <section className="section-card">
          <h4>外部经验</h4>
          <div className="home-actions">
            <label className="primary-button primary-button--secondary file-button">
              加载外部规划经验文件
              <input type="file" accept="application/json,.json" hidden onChange={onImportMethodology} />
            </label>
            <button type="button" className="primary-button" onClick={onExportTemplate}>
              案例模板下载
            </button>
          </div>
        </section>
      ) : null}

      {methodology ? (
        <section className="section-card">
          <h4>经验导出</h4>
          <div className="home-actions">
            <button type="button" className="primary-button primary-button--secondary" onClick={onExportMethodology}>
              导出当前经验 JSON
            </button>
          </div>
        </section>
      ) : null}

      {methodology ? (
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
      ) : null}
    </section>
  );
}
