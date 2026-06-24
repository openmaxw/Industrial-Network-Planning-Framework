import React from 'react';

export function HomePage({ methodology }) {
  return (
    <section className="standard-page">
      <div className="standard-page__header">
        <h3>首页</h3>
        <p>系统启动后的默认入口页，用于承载方法论与案例管理能力。</p>
      </div>

      <section className="section-card">
        <h4>系统简介</h4>
        <p>{methodology.meta.description}</p>
      </section>

      <section className="section-card">
        <h4>当前方法论</h4>
        <div className="output-grid">
          <div className="output-item">
            <span className="output-item__label">方法论键值</span>
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
        <h4>方法论操作</h4>
        <div className="home-actions">
          <button type="button" className="primary-button">加载方法论 JSON</button>
          <button type="button" className="primary-button primary-button--secondary">导出方法论 JSON</button>
        </div>
        <p className="empty-tip">当前先放操作占位，后续再接真实导入导出逻辑。</p>
      </section>

      <section className="section-card">
        <h4>案例入口</h4>
        <p className="empty-tip">后续这里会展示当前方法论自带的案例列表，例如 ISA95 + IEC62443 方法论下的多个案例。</p>
      </section>
    </section>
  );
}
