import { useMemo, useState } from 'react';
import { buildEmptyDraft, buildInitialFormData, buildRecordFromDraft } from '../engine/methodologyHelpers.js';

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
    'business-description': [],
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
    'business-description': buildEmptyDraft(['business.name', 'business.zone']),
  };
}

function createInitialSelections() {
  return {
    'project-goal': 0,
    'business-description': 0,
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
          const nextRecord = buildRecordFromDraft(fieldKeys, draft);
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
