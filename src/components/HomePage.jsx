import React from 'react';

export function HomePage({ methodology, methodologyCatalog, activeAngle, onSelectMethodology, onLoadCase, onExportRuntime, onExportMethodology, onImportMethodology }) {
  const shouldShow = (sectionId) => activeAngle === sectionId;

  if (activeAngle === 'intro') {
    return (
      <section className="standard-page">
        <section className="section-card intro-card">
          <h3>平台简介</h3>
          <p>
            本平台用于沉淀、组织与协作工业网络规划相关的方法论配置，使不同 FAE、不同项目类型、不同系统对象与不同技术方向下的经验能够被结构化保存、复用与讨论。
          </p>
          <div className="intro-grid">
            <div className="output-item">
              <span className="output-item__label">平台作用</span>
              <strong>沉淀方法论配置，统一表达经验</strong>
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
      {shouldShow('angle-standards') ? (
        <section id="angle-standards" className="section-card">
          <h4>标准理论角度</h4>
          <div className="record-list">
            {methodologyCatalog
              .filter((item) => ['isa95', 'iec62443', 'isa95-iec62443'].includes(item.key))
              .map((item) => (
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
      ) : null}

      {shouldShow('angle-scenarios') ? (
        <section id="angle-scenarios" className="section-card">
          <h4>应用场景角度</h4>
          <div className="record-list">
            <div className="record-card">
              <strong>储能项目</strong>
              <p>后续可沉淀储能场站、边缘设备接入与远程维护类方法论配置。</p>
            </div>
            <div className="record-card">
              <strong>汽车产线项目</strong>
              <p>后续可沉淀总装、焊装、涂装等典型产线网络规划方法论配置。</p>
            </div>
          </div>
        </section>
      ) : null}

      {shouldShow('angle-systems') ? (
        <section id="angle-systems" className="section-card">
          <h4>系统对象角度</h4>
          <div className="record-list">
            <div className="record-card">
              <strong>MES</strong>
              <p>后续可沉淀 MES 系统相关对象、接口、区域与交互方法论配置。</p>
            </div>
            <div className="record-card">
              <strong>FMCS</strong>
              <p>后续可沉淀 FMCS 系统对象、边界、监控与维护特征方法论配置。</p>
            </div>
          </div>
        </section>
      ) : null}

      {shouldShow('angle-tech') ? (
        <section id="angle-tech" className="section-card">
          <h4>技术方向角度</h4>
          <div className="record-list">
            <div className="record-card">
              <strong>TSN</strong>
              <p>后续可沉淀面向确定性通信的网络规划方法论配置。</p>
            </div>
            <div className="record-card">
              <strong>5G</strong>
              <p>后续可沉淀工业无线接入、切片、边缘协同类方法论配置。</p>
            </div>
          </div>
        </section>
      ) : null}

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
