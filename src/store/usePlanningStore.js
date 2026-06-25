import { useMemo, useState } from 'react';
import { buildEmptyDraft, buildInitialFormData, buildRecordFromDefaults, buildRecordFromDraft } from '../engine/methodologyHelpers.js';

function createInitialCollections() {
  return {
    'project-goal': [
      {
        'project.name': '工业网络规划项目',
        'project.customer': '',
        'project.industry': '离散制造',
        'project.scope': '整厂',
        'project.goal': '新建',
        'project.delivery': '',
        'project.owner': '',
        'project.confirmStatus': '待确认',
      },
    ],
    'scope-definition': [
      {
        'overview.name': '主项目范围',
        'overview.space': '',
        'overview.distribution': '',
        'overview.cross': '',
        'overview.scale': '',
        'overview.note': '',
      },
    ],
    'business-description': [
      {
        'scene.name': '核心业务场景',
        'scene.mode': '周期通信',
        'scene.source': '',
        'scene.target': '',
        'scene.purpose': '生产控制',
        'scene.medium': '有线',
        'scene.continuity': '高',
        'scene.note': '',
      },
    ],
    'asset-allocation': [
      {
        'asset.name': 'PLC-01',
        'asset.type': 'PLC',
        'asset.system': '',
        'asset.location': '',
        'asset.level': 'Level 1',
        'asset.status': '在用',
        'asset.access': '有线固定接入',
        'asset.criticality': '高',
        'asset.note': '',
      },
    ],
    'environment-conditions': [
      {
        'env.topic': '现场环境条件',
        'env.interference': '',
        'env.install': '',
        'env.distance': '',
        'env.medium': '',
        'env.power': '',
        'env.wireless': '',
        'env.note': '',
      },
    ],
    'implementation-constraints': [
      {
        'constraint.name': '预算约束',
        'constraint.type': '预算',
        'constraint.required': '是',
        'constraint.scope': '',
        'constraint.existing': '',
        'constraint.note': '',
      },
    ],
    'security-scenario': [
      {
        'secScenario.name': '本地生产场景',
        'secScenario.type': '本地生产',
        'secScenario.scope': '',
        'secScenario.remote': '无',
        'secScenario.external': '无',
        'secScenario.note': '',
      },
    ],
    'exposure-analysis': [
      {
        'secExposure.name': 'PLC-01',
        'secExposure.relatedScenario': '',
        'secExposure.type': '远程接入',
        'secExposure.source': '',
        'secExposure.control': '',
        'secExposure.risk': '中',
        'secExposure.note': '',
      },
    ],
  };
}

function createInitialDrafts() {
  return {
    'project-goal': buildEmptyDraft([
      'project.name',
      'project.customer',
      'project.industry',
      'project.scope',
      'project.goal',
      'project.delivery',
      'project.owner',
      'project.confirmStatus',
    ]),
    'scope-definition': buildEmptyDraft([
      'overview.name',
      'overview.space',
      'overview.distribution',
      'overview.cross',
      'overview.scale',
      'overview.note',
    ]),
    'business-description': buildEmptyDraft([
      'scene.name',
      'scene.mode',
      'scene.source',
      'scene.target',
      'scene.purpose',
      'scene.medium',
      'scene.continuity',
      'scene.note',
    ]),
    'asset-allocation': buildEmptyDraft([
      'asset.name',
      'asset.type',
      'asset.system',
      'asset.location',
      'asset.level',
      'asset.status',
      'asset.access',
      'asset.criticality',
      'asset.note',
    ]),
    'environment-conditions': buildEmptyDraft([
      'env.topic',
      'env.interference',
      'env.install',
      'env.distance',
      'env.medium',
      'env.power',
      'env.wireless',
      'env.note',
    ]),
    'implementation-constraints': buildEmptyDraft([
      'constraint.name',
      'constraint.type',
      'constraint.required',
      'constraint.scope',
      'constraint.existing',
      'constraint.note',
    ]),
    'security-scenario': buildEmptyDraft([
      'secScenario.name',
      'secScenario.type',
      'secScenario.scope',
      'secScenario.remote',
      'secScenario.external',
      'secScenario.note',
    ]),
    'exposure-analysis': buildEmptyDraft([
      'secExposure.name',
      'secExposure.relatedScenario',
      'secExposure.type',
      'secExposure.source',
      'secExposure.control',
      'secExposure.risk',
      'secExposure.note',
    ]),
  };
}

function createInitialSelections() {
  return {
    'project-goal': 0,
    'scope-definition': 0,
    'business-description': 0,
    'asset-allocation': 0,
    'environment-conditions': 0,
    'implementation-constraints': 0,
    'security-scenario': 0,
    'exposure-analysis': 0,
  };
}

function createInitialExpandedGroups() {
  return {
    'raw-information': true,
    'design-derivation': true,
    'deliverables': true,
    'security-analysis': true,
  };
}

export function usePlanningStore(initialMethodology = null) {
  const [currentMethodology, setCurrentMethodology] = useState(initialMethodology);
  const [activePageKey, setActivePageKey] = useState('home');
  const [expandedGroups, setExpandedGroups] = useState(createInitialExpandedGroups);
  const [formData, setFormData] = useState(() => buildInitialFormData(initialMethodology?.fields ?? {}));
  const [recordCollections, setRecordCollections] = useState(createInitialCollections);
  const [recordDrafts, setRecordDrafts] = useState(createInitialDrafts);
  const [selectedRecordIndexMap, setSelectedRecordIndexMap] = useState(createInitialSelections);

  const actions = useMemo(
    () => ({
      setActivePageKey,
      selectMethodology(methodology) {
        setCurrentMethodology(methodology);
        setExpandedGroups(createInitialExpandedGroups());
        setFormData(buildInitialFormData(methodology.fields ?? {}));
        setRecordCollections(createInitialCollections());
        setRecordDrafts(createInitialDrafts());
        setSelectedRecordIndexMap(createInitialSelections());
        setActivePageKey('home');
      },
      toggleExpanded(key) {
        setExpandedGroups((current) => ({
          ...current,
          [key]: !current[key],
        }));
      },
      setFieldValue(fieldKey, value) {
        setFormData((current) => ({
          ...current,
          [fieldKey]: value,
        }));
      },
      setDraftValue(pageKey, fieldKey, value) {
        setRecordDrafts((current) => ({
          ...current,
          [pageKey]: {
            ...current[pageKey],
            [fieldKey]: value,
          },
        }));
      },
      setSelectedRecord(pageKey, index) {
        setSelectedRecordIndexMap((current) => ({
          ...current,
          [pageKey]: index,
        }));
      },
      updateSelectedRecord(pageKey, fieldKey, value) {
        setRecordCollections((current) => {
          const nextRecords = [...(current[pageKey] ?? [])];
          const selectedIndex = selectedRecordIndexMap[pageKey] ?? 0;
          const currentRecord = nextRecords[selectedIndex] ?? {};
          nextRecords[selectedIndex] = {
            ...currentRecord,
            [fieldKey]: value,
          };
          return {
            ...current,
            [pageKey]: nextRecords,
          };
        });
      },
      addRecord(pageKey, fieldKeys) {
        setRecordCollections((currentCollections) => {
          const draft = recordDrafts[pageKey] ?? {};
          const hasDraftValue = fieldKeys.some((fieldKey) => Boolean(draft[fieldKey]));
          const nextRecord = hasDraftValue
            ? buildRecordFromDraft(fieldKeys, draft)
            : buildRecordFromDefaults(fieldKeys, currentMethodology?.fields ?? {});
          const nextRecords = [...(currentCollections[pageKey] ?? []), nextRecord];

          setSelectedRecordIndexMap((currentSelected) => ({
            ...currentSelected,
            [pageKey]: nextRecords.length - 1,
          }));

          return {
            ...currentCollections,
            [pageKey]: nextRecords,
          };
        });

        setRecordDrafts((currentDrafts) => ({
          ...currentDrafts,
          [pageKey]: buildEmptyDraft(fieldKeys),
        }));
      },
      loadCase(caseData) {
        setFormData((current) => ({
          ...current,
          ...(caseData.formData ?? {}),
        }));

        setRecordCollections((current) => ({
          ...current,
          ...(caseData.recordCollections ?? {}),
        }));

        setSelectedRecordIndexMap(createInitialSelections());
        setActivePageKey('project-goal');
      },
    }),
    [recordDrafts, selectedRecordIndexMap],
  );

  return {
    state: {
      currentMethodology,
      activePageKey,
      expandedGroups,
      formData,
      recordCollections,
      recordDrafts,
      selectedRecordIndexMap,
    },
    actions,
  };
}
