import React, { useMemo } from 'react';
import { HomePage } from '../components/HomePage.jsx';
import { OutputPage } from '../components/OutputPage.jsx';
import { RecordCollectionPage } from '../components/RecordCollectionPage.jsx';
import { StandardPage } from '../components/StandardPage.jsx';
import {
  getActiveFieldEntries,
  getPage,
} from '../engine/methodologyHelpers.js';
import { demoMethodology } from '../methodologies/demoMethodology.js';
import { usePlanningStore } from '../store/usePlanningStore.js';

export function App() {
  const menuGroups = demoMethodology.navigation;
  const { state, actions } = usePlanningStore(demoMethodology);
  const { activePageKey, expandedGroups, formData, recordCollections, recordDrafts } = state;
  const { setActivePageKey, toggleExpanded, setFieldValue, setDraftValue, addRecord } = actions;

  const activePage = useMemo(() => getPage(demoMethodology, activePageKey), [activePageKey]);
  const activeFieldEntries = useMemo(() => getActiveFieldEntries(activePage, formData), [activePage, formData]);

  const renderMenuNode = (node, level = 0) => {
    const isActive = activePageKey === node.key;
    const itemClassName = [level === 0 ? 'menu-item' : 'menu-subitem', isActive ? 'is-active' : '']
      .filter(Boolean)
      .join(' ');

    return (
      <div key={node.key} className="menu-item-block">
        <button type="button" className={itemClassName} onClick={() => setActivePageKey(node.key)}>
          {node.title}
        </button>
        {node.children && expandedGroups[node.key] !== false ? (
          <div className={level === 0 ? 'menu-subitems-root' : 'menu-subitems'}>
            {node.children.map((child) => renderMenuNode(child, level + 1))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="app-shell">
      <header className="system-bar">
        <div className="system-bar__title">
          <h1>{demoMethodology.meta.title}</h1>
          <p>{demoMethodology.meta.subtitle}</p>
        </div>
        <div className="system-bar__meta">
          <span className="header-badge">Step 1 / 应用壳层</span>
        </div>
      </header>

      <main className="workspace-layout">
        <aside className="sidebar-panel">
          <div className="panel-heading">
            <h2>导航菜单</h2>
            <p>当前为静态骨架</p>
          </div>
          <div className="menu-home-entry">
            <button
              type="button"
              className={activePageKey === 'home' ? 'menu-item is-active' : 'menu-item'}
              onClick={() => setActivePageKey('home')}
            >
              首页
            </button>
          </div>
          <nav className="menu-tree">
            {menuGroups.map((group) => (
              <section key={group.title} className="menu-group">
                <button type="button" className="menu-group-button" onClick={() => toggleExpanded(group.key)}>
                  {group.title}
                </button>
                {expandedGroups[group.key] !== false ? (
                  <div className="menu-items">{group.children?.map((item) => renderMenuNode(item))}</div>
                ) : null}
              </section>
            ))}
          </nav>
        </aside>

        <section className="content-panel">
          <div className="panel-heading">
            <h2>内容区</h2>
            <p>后续这里会渲染标准页</p>
          </div>

          <section className="app-card hero-card">
            {activePage?.type === 'home' ? (
              <HomePage methodology={demoMethodology} />
            ) : activePage?.type === 'standard-record' ? (
              <StandardPage
                page={activePage}
                fieldMap={demoMethodology.fields}
                formData={formData}
                recordCollections={recordCollections}
                onFieldChange={setFieldValue}
              />
            ) : activePage?.type === 'record-collection' ? (
              <RecordCollectionPage
                page={activePage}
                fieldMap={demoMethodology.fields}
                records={recordCollections[activePageKey] ?? []}
                draftRecord={recordDrafts[activePageKey] ?? {}}
                onDraftChange={(fieldKey, value) => setDraftValue(activePageKey, fieldKey, value)}
                onAddRecord={() => addRecord(activePageKey, activePage.fields ?? [])}
              />
            ) : activePage?.type === 'output' ? (
              <OutputPage
                page={activePage}
                outputConfig={demoMethodology.outputs[activePageKey]}
                fieldMap={demoMethodology.fields}
                formData={formData}
                recordCollections={recordCollections}
              />
            ) : (
              <>
                <h3>{activePage?.title ?? '未选择页面'}</h3>
                <p>{activePage?.description ?? '请选择左侧菜单项。'}</p>
              </>
            )}
          </section>

          <section className="app-card placeholder-card">
            <h3>当前页面信息</h3>
            <ul>
              <li>页面键值：{activePageKey}</li>
              <li>页面类型：{activePage?.type ?? 'unknown'}</li>
              <li>字段状态：内存中已可编辑</li>
              {activePageKey === 'zone-planning' ? (
                <li>
                  依赖示例：当 `zone.strategy` = `核心隔离` 时，显示 `zone.isolationNotes`
                </li>
              ) : null}
              {activePageKey === 'zone-planning' ? (
                <li>
                  数据依赖示例：`zone.relatedAsset` 来自 `input.assets`，`zone.businessZone` 来自业务记录里的区域字段
                </li>
              ) : null}
              {activeFieldEntries.map((field) => (
                <li key={field.key}>
                  {field.key}：{field.value || '（空）'}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>

      <footer className="app-footer">
        <p>LICENSE: Internal project scaffold for framework prototyping.</p>
      </footer>
    </div>
  );
}
