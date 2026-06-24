import { useMemo, useState } from 'react';
import { buildEmptyDraft, buildInitialFormData, buildRecordFromDraft } from '../engine/methodologyHelpers.js';

function createInitialCollections() {
  return {
    'business-description': [],
  };
}

function createInitialDrafts() {
  return {
    'business-description': buildEmptyDraft(['business.name', 'business.zone']),
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

  const actions = useMemo(
    () => ({
      setActivePageKey,
      selectMethodology(methodology) {
        setCurrentMethodology(methodology);
        setExpandedGroups(createInitialExpandedGroups());
        setFormData(buildInitialFormData(methodology.fields ?? {}));
        setRecordCollections(createInitialCollections());
        setRecordDrafts(createInitialDrafts());
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
      addRecord(pageKey, fieldKeys) {
        setRecordCollections((currentCollections) => {
          const draft = recordDrafts[pageKey] ?? {};
          const nextRecord = buildRecordFromDraft(fieldKeys, draft);

          return {
            ...currentCollections,
            [pageKey]: [...(currentCollections[pageKey] ?? []), nextRecord],
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

        setActivePageKey('project-basic');
      },
    }),
    [recordDrafts],
  );

  return {
    state: {
      currentMethodology,
      activePageKey,
      expandedGroups,
      formData,
      recordCollections,
      recordDrafts,
    },
    actions,
  };
}
