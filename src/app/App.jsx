import React, { useMemo, useState } from 'react';
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
  const { currentMethodology, activePageKey, expandedGroups, formData, recordCollections, recordDrafts, selectedRecordIndexMap } = state;
  const { selectMethodology, setActivePageKey, toggleExpanded, setFieldValue, setDraftValue, setSelectedRecord, updateSelectedRecord, addRecord, loadCase } = actions;
  const [activeHomeAngle, setActiveHomeAngle] = useState('intro');
  const [homeExperienceMode, setHomeExperienceMode] = useState('internal');
  const [activeHomeExperienceKey, setActiveHomeExperienceKey] = useState('');

  const menuGroups = useMemo(() => {
    const methodologyGroups = currentMethodology?.navigation ?? [];
    const groupsByTitle = Object.fromEntries(methodologyGroups.map((group) => [group.title, group.children ?? []]));

    return [
      {
        key: 'how-to-ask',
        title: '怎么问（输入）',
        children: groupsByTitle['怎么问（输入）'] ?? [],
      },
      {
        key: 'how-to-judge',
        title: '怎么判（规则）',
        children: groupsByTitle['怎么判（规则）'] ?? [],
      },
      {
        key: 'how-to-derive',
        title: '怎么推（推演）',
        children: groupsByTitle['怎么推（推演）'] ?? [],
      },
      {
        key: 'how-to-land',
        title: '怎么落（输出）',
        children: groupsByTitle['怎么落（输出）'] ?? [],
      },
    ];
  }, [currentMethodology]);
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

  const handleExportTemplate = () => {
    const template = {
      meta: {
        key: 'experience-template',
        title: '经验模板示例',
        version: '1.0.0',
        description: '用于说明经验文件的基础结构、页面定义、字段定义与输出配置格式。',
      },
      notes: {
        purpose: '供外部团队参考，用于创建自己的经验配置 JSON。',
        supportedPageTypes: ['home', 'standard-record', 'record-collection', 'output'],
        supportedOutputSectionKinds: ['key-value-summary', 'record-summary', 'text-summary'],
      },
      example: currentMethodology ?? methodologyCatalog[0]?.methodology,
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = objectUrl;
    anchor.download = 'experience-template-example.json';
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

  const jumpToHomeSection = (sectionId) => {
    setActivePageKey('home');
    setActiveHomeAngle(sectionId);
  };

  const findSiblingKeys = (targetKey, items) => {
    for (const item of items ?? []) {
      if (item.children?.some((child) => child.key === targetKey)) {
        return item.children.map((child) => child.key);
      }

      if (item.key === targetKey) {
        return [targetKey];
      }

      const nested = findSiblingKeys(targetKey, item.children);
      if (nested.length > 0) {
        return nested;
      }
    }

    return [];
  };

  const toggleMenuNode = (targetKey) => {
    const siblingKeys = findSiblingKeys(targetKey, menuGroups);

    if (siblingKeys.length === 0) {
      toggleExpanded(targetKey);
      return;
    }

    actions.setExpandedWithinLevel?.(siblingKeys, targetKey);
  };

  const renderMenuNode = (node, level = 0) => {
    const isActive = activePageKey === node.key;
    const hasChildren = Boolean(node.children?.length);
    const itemClassName = [level === 0 ? 'menu-item' : 'menu-subitem', isActive ? 'is-active' : '']
      .filter(Boolean)
      .join(' ');

    return (
      <div key={node.key} className="menu-item-block">
        <button
          type="button"
          className={itemClassName}
          onClick={() => {
            if (hasChildren) {
              toggleMenuNode(node.key);
              return;
            }
            setActivePageKey(node.key);
          }}
        >
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
          activeAngle={activeHomeAngle}
          experienceMode={homeExperienceMode}
          activeExperienceKey={activeHomeExperienceKey}
          onSelectMethodology={(methodology, sourceKey) => {
            setActiveHomeExperienceKey(sourceKey ?? methodology?.meta?.key ?? '');
            selectMethodology(methodology);
          }}
          onLoadCase={loadCase}
          onExportRuntime={handleExportRuntime}
          onExportMethodology={handleExportMethodology}
          onExportTemplate={handleExportTemplate}
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
          recordCollections={recordCollections}
          draftRecord={recordDrafts[activePageKey] ?? {}}
          selectedIndex={selectedRecordIndexMap[activePageKey] ?? 0}
          onSelectRecord={(index) => setSelectedRecord(activePageKey, index)}
          onRecordFieldChange={(fieldKey, value) => updateSelectedRecord(activePageKey, fieldKey, value)}
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
          <button
            type="button"
            className="platform-title-button"
            onClick={() => {
              setActivePageKey('home');
              setActiveHomeAngle('intro');
            }}
          >
            <h1>老王讲规划</h1>
            <p>一个工业网络规划经验表达框架</p>
          </button>
        </div>
        <div className="system-bar__meta">
          <div className="system-angle-nav">
            <button
              type="button"
              className={homeExperienceMode === 'internal' ? 'angle-link is-active' : 'angle-link'}
              onClick={() => {
                setActivePageKey('home');
                setHomeExperienceMode('internal');
                setActiveHomeAngle('angle-standards');
                setActiveHomeExperienceKey('');
              }}
            >
              加载内部规划经验
            </button>
            <button
              type="button"
              className={homeExperienceMode === 'external' ? 'angle-link is-active' : 'angle-link'}
              onClick={() => {
                setActivePageKey('home');
                setHomeExperienceMode('external');
                setActiveHomeAngle('external');
                setActiveHomeExperienceKey('');
              }}
            >
              加载外部规划经验
            </button>
          </div>
        </div>
      </header>

      <main className="workspace-layout">
        <aside className="sidebar-panel">
          <div className="menu-home-entry">
            <button
              type="button"
              className={activePageKey === 'home' ? 'menu-item is-active' : 'menu-item'}
              onClick={() => {
                setActivePageKey('home');
                setActiveHomeAngle('intro');
              }}
            >
              首页
            </button>
          </div>
          <nav className="menu-tree">
            {menuGroups.map((group) => (
              <section key={group.title} className="menu-group">
                <button type="button" className="menu-group-button" onClick={() => toggleMenuNode(group.key)}>
                  {group.title}
                </button>
                {expandedGroups[group.key] !== false ? (
                  <div className="menu-items">
                    {group.children?.length ? group.children.map((item) => renderMenuNode(item)) : <p className="empty-tip">暂无已加载经验</p>}
                  </div>
                ) : null}
              </section>
            ))}
          </nav>
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
