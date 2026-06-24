import React, { useMemo } from 'react';
import { HomePage } from '../components/HomePage.jsx';
import { OutputPage } from '../components/OutputPage.jsx';
import { RecordCollectionPage } from '../components/RecordCollectionPage.jsx';
import { StandardPage } from '../components/StandardPage.jsx';
import { getActiveFieldEntries, getPage } from '../engine/methodologyHelpers.js';
import { validateMethodologyConfig } from '../engine/validateMethodologyConfig.js';
import { methodologyCatalog } from '../methodologies/methodologyCatalog.js';
import { usePlanningStore } from '../store/usePlanningStore.js';

export function App() {
  const { state, actions } = usePlanningStore();
  const { currentMethodology, activePageKey, expandedGroups, formData, recordCollections, recordDrafts } = state;
  const { selectMethodology, setActivePageKey, toggleExpanded, setFieldValue, setDraftValue, addRecord, loadCase } = actions;

  const menuGroups = currentMethodology?.navigation ?? [];
  const activePage = useMemo(
    () => (currentMethodology ? getPage(currentMethodology, activePageKey) : { type: 'home', title: '首页' }),
    [currentMethodology, activePageKey],
  );
  const activeFieldEntries = useMemo(() => getActiveFieldEntries(activePage, formData), [activePage, formData]);

  const handleExportRuntime = () => {
    if (!currentMethodology) {
      return;
    }

    const payload = {
      methodologyKey: currentMethodology.meta.key,
      exportedAt: new Date().toISOString(),
      formData,
      recordCollections,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = objectUrl;
    anchor.download = `${currentMethodology.meta.key}-runtime-data.json`;
    anchor.click();

    URL.revokeObjectURL(objectUrl);
  };

  const handleExportMethodology = () => {
    if (!currentMethodology) {
      return;
    }

    const payload = JSON.stringify(currentMethodology, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = objectUrl;
    anchor.download = `${currentMethodology.meta.key}.methodology.json`;
    anchor.click();

    URL.revokeObjectURL(objectUrl);
  };

  const handleImportMethodology = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const validationErrors = validateMethodologyConfig(parsed);

      if (validationErrors.length > 0) {
        window.alert(`方法论配置校验失败：\n- ${validationErrors.join('\n- ')}`);
        return;
      }

      selectMethodology(parsed);
    } catch (error) {
      window.alert('方法论配置加载失败，请检查 JSON 格式。');
    } finally {
      event.target.value = '';
    }
  };

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

  const renderContent = () => {
    if (activePage?.type === 'home') {
      return (
        <HomePage
          methodology={currentMethodology}
          methodologyCatalog={methodologyCatalog}
          onSelectMethodology={selectMethodology}
          onLoadCase={loadCase}
          onExportRuntime={handleExportRuntime}
          onExportMethodology={handleExportMethodology}
          onImportMethodology={handleImportMethodology}
        />
      );
    }

    if (activePage?.type === 'standard-record') {
      return (
        <StandardPage
          page={activePage}
          fieldMap={currentMethodology.fields}
          formData={formData}
          recordCollections={recordCollections}
          onFieldChange={setFieldValue}
        />
      );
    }

    if (activePage?.type === 'record-collection') {
      return (
        <RecordCollectionPage
          page={activePage}
          fieldMap={currentMethodology.fields}
          records={recordCollections[activePageKey] ?? []}
          draftRecord={recordDrafts[activePageKey] ?? {}}
          onDraftChange={(fieldKey, value) => setDraftValue(activePageKey, fieldKey, value)}
          onAddRecord={() => addRecord(activePageKey, activePage.fields ?? [])}
        />
      );
    }

    if (activePage?.type === 'output') {
      return (
        <OutputPage
          page={activePage}
          outputConfig={currentMethodology.outputs[activePageKey]}
          fieldMap={currentMethodology.fields}
          formData={formData}
          recordCollections={recordCollections}
        />
      );
    }

    return (
      <section className="standard-page">
        <div className="standard-page__header">
          <h3>{activePage?.title ?? '未选择页面'}</h3>
          <p>{activePage?.description ?? '请选择左侧菜单项。'}</p>
        </div>
      </section>
    );
  };

  return (
    <div className="app-shell">
      <header className="system-bar">
        <div className="system-bar__title">
          <h1>{currentMethodology?.meta.title ?? '工业网络规划方法论驱动框架'}</h1>
          {currentMethodology?.meta.subtitle ? <p>{currentMethodology.meta.subtitle}</p> : null}
        </div>
        <div className="system-bar__meta">
          <span className="header-badge">Framework</span>
        </div>
      </header>

      <main className="workspace-layout">
        <aside className="sidebar-panel">
          <div className="menu-home-entry">
            <button
              type="button"
              className={activePageKey === 'home' ? 'menu-item is-active' : 'menu-item'}
              onClick={() => setActivePageKey('home')}
            >
              首页
            </button>
          </div>
          {currentMethodology ? (
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
          ) : null}
        </aside>

        <section className="content-panel">{renderContent()}</section>
      </main>

      {currentMethodology ? (
        <footer className="app-footer">
          <p>
            当前方法论：{currentMethodology.meta.key}
            {activeFieldEntries.length ? ` · 当前页字段数：${activeFieldEntries.length}` : ''}
          </p>
        </footer>
      ) : (
        <footer className="app-footer">
          <p>LICENSE: Internal project scaffold for framework prototyping.</p>
        </footer>
      )}
    </div>
  );
}
