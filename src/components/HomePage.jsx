import React from 'react';

export function HomePage({ methodology, methodologyCatalog, activeAngle, experienceMode, activeExperienceKey, activeCategoryKey, onSelectMethodology, onLoadCase, onExportMethodology, onExportTemplate, onImportMethodology }) {
  const internalMethodologies = methodologyCatalog.filter((item) => ['isa95', 'iec62443', 'isa95-iec62443'].includes(item.key));
  const scenarioMethodologies = methodologyCatalog.filter((item) => ['scenario-ess'].includes(item.key));
  const systemMethodologies = methodologyCatalog.filter((item) => ['system-mes'].includes(item.key));

  const standardItems = internalMethodologies.map((item) => ({ ...item, available: true, categoryKey: 'angle-standards' }));
  const scenarioItems = [
    ...scenarioMethodologies.map((item) => ({ ...item, available: true, categoryKey: 'angle-scenarios' })),
    { key: 'scenario-auto', title: '汽车产线项目', available: false, categoryKey: 'angle-scenarios' },
  ];
  const systemItems = [
    ...systemMethodologies.map((item) => ({ ...item, available: true, categoryKey: 'angle-systems' })),
    { key: 'system-fmcs', title: 'FMCS', available: false, categoryKey: 'angle-systems' },
  ];
  const techItems = [
    { key: 'tech-tsn', title: 'TSN', available: false, categoryKey: 'angle-tech' },
    { key: 'tech-5g', title: '5G', available: false, categoryKey: 'angle-tech' },
    { key: 'tech-apl', title: 'APL', available: false, categoryKey: 'angle-tech' },
  ];
  const availableCount = methodologyCatalog.filter((item) => item.status === '可用').length;

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
            onSelectMethodology(item.methodology, item.key, item.categoryKey);
          }}
          disabled={item.available === false}
        >
          <strong>{item.title}</strong>
          {item.description ? <span className="experience-chip__desc">{item.description}</span> : null}
          {item.available === false ? <span className="experience-chip__tag">待建设</span> : null}
        </button>
      ))}
    </div>
  );

  const renderExperienceMeta = () => {
    const activeItem = methodologyCatalog.find((item) => item.key === activeExperienceKey);

    if (!activeItem || experienceMode !== 'internal') {
      return null;
    }

    return (
      <section className="section-card">
        <h4>当前经验</h4>
        <div className="record-card">
          <p>名称：{activeItem.title}</p>
          <p>说明：{activeItem.description}</p>
          <p>适用对象：{(activeItem.audience ?? []).join('、') || '待补充'}</p>
          <p>标签：{(activeItem.tags ?? []).join('、') || '待补充'}</p>
          <p>状态：{activeItem.status ?? '待补充'}</p>
        </div>
      </section>
    );
  };

  const renderCases = () => {
    if (!methodology?.cases?.length) {
      return null;
    }

    return (
      <section className="section-card">
        <h4>案例</h4>
        <div className="case-grid">
          {methodology.cases.map((item) => (
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
    );
  };

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
            <div className="output-item">
              <span className="output-item__label">当前经验数</span>
              <strong>{availableCount} 套可用经验</strong>
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
          {activeCategoryKey === 'angle-standards' ? renderCases() : null}

          <section id="angle-scenarios" className="section-card">
            <h4>按应用场景分类</h4>
            {renderExperienceButtons(scenarioItems)}
          </section>
          {activeCategoryKey === 'angle-scenarios' ? renderCases() : null}

          <section id="angle-systems" className="section-card">
            <h4>按系统对象分类</h4>
            {renderExperienceButtons(systemItems)}
          </section>
          {activeCategoryKey === 'angle-systems' ? renderCases() : null}

          <section id="angle-tech" className="section-card">
            <h4>按技术方向分类</h4>
            {renderExperienceButtons(techItems)}
          </section>
          {activeCategoryKey === 'angle-tech' ? renderCases() : null}

          {!activeExperienceKey ? (
            <section className="section-card">
              <h4>当前状态</h4>
              <p className="field-hint">请选择一套经验，查看其案例、标签和详细说明。</p>
            </section>
          ) : null}

          {renderExperienceMeta()}
        </>
      ) : null}

      {experienceMode === 'external' ? (
        <>
          <section className="section-card">
            <h4>经验导入</h4>
            <div className="home-actions">
              <label className="primary-button primary-button--secondary file-button">
                导入外部经验
                <input type="file" accept="application/json,.json" hidden onChange={onImportMethodology} />
              </label>
              <button type="button" className="primary-button" onClick={onExportTemplate}>
                案例模板下载
              </button>
            </div>
          </section>

          <section className="section-card">
            <h4>经验导出</h4>
            <div className="home-actions">
              {methodology ? (
                <button type="button" className="primary-button primary-button--secondary" onClick={onExportMethodology}>
                  导出当前经验
                </button>
              ) : (
                <span className="field-hint">请先加载一个经验，再进行导出。</span>
              )}
            </div>
          </section>
        </>
      ) : null}

    </section>
  );
}
