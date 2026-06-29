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
            本平台是一个面向工业网络规划的经验表达与经验迭代框架。它将项目中的资料采集、判断依据、设计推演、结果落地和经验迭代组织成一个显式闭环，使规划过程不仅能够形成结果，也能够持续沉淀新的经验并反哺后续项目。
          </p>
          <div className="intro-grid">
            <div className="output-item">
              <span className="output-item__label">闭环设计</span>
              <strong>规则 → 推演 → 输出 → 迭代的显式闭环</strong>
            </div>
            <div className="output-item">
              <span className="output-item__label">平台定位</span>
              <strong>工业网络规划经验表达、复用、协作与迭代平台</strong>
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

        <section className="section-card">
          <h4>功能定位</h4>
          <div className="record-card">
            <p>1. 用统一结构承载不同方法、不同场景、不同系统对象和不同技术方向下的规划经验。</p>
            <p>2. 让判断依据、设计推演和结果输出之间形成可解释、可复盘、可复用的关系。</p>
            <p>3. 让项目中的特殊判断和新增经验能够回流到经验库，形成持续迭代机制。</p>
          </div>
        </section>

        <section className="section-card">
          <h4>一级菜单说明</h4>
          <div className="record-list">
            <div className="record-card">
              <strong>资料采集</strong>
              <p>用于收集项目原始信息、约束条件、对象构成和现场边界，是后续判断和推演的输入基础。</p>
            </div>
            <div className="record-card">
              <strong>判断依据</strong>
              <p>用于沉淀可复用的规则主题、触发条件和推荐动作，为设计判断提供稳定依据。</p>
            </div>
            <div className="record-card">
              <strong>设计推演</strong>
              <p>用于基于输入和规则形成具体设计结论，并显式记录引用了哪些规则主题。</p>
            </div>
            <div className="record-card">
              <strong>结果落地</strong>
              <p>用于将设计结论整理为面向客户与面向内部的输出结果，支撑交付、复盘和案例沉淀。</p>
            </div>
            <div className="record-card">
              <strong>经验迭代</strong>
              <p>用于汇总特殊判断、经验候选和回写建议，将本项目中新长出的经验反哺回系统。</p>
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
