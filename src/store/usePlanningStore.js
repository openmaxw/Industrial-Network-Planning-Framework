import { useMemo, useState } from 'react';
import { buildEmptyDraft, buildInitialFormData, buildRecordFromDraft } from '../engine/methodologyHelpers.js';

export function usePlanningStore(methodology) {
  const [activePageKey, setActivePageKey] = useState('home');
  const [expandedGroups, setExpandedGroups] = useState({
    'raw-information': true,
    'design-derivation': true,
    'deliverables': true,
    'security-analysis': true,
  });
  const [formData, setFormData] = useState(() => buildInitialFormData(methodology.fields));
  const [recordCollections, setRecordCollections] = useState({
    'business-description': [],
  });
  const [recordDrafts, setRecordDrafts] = useState({
    'business-description': buildEmptyDraft(['business.name', 'business.zone']),
  });

  const actions = useMemo(
    () => ({
      setActivePageKey,
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
    }),
    [recordDrafts],
  );

  return {
    state: {
      activePageKey,
      expandedGroups,
      formData,
      recordCollections,
      recordDrafts,
    },
    actions,
  };
}
