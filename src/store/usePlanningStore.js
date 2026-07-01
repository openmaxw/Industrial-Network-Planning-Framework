import { useMemo, useState } from 'react';
import { buildEmptyDraft, buildInitialFormData, buildRecordFromDefaults, buildRecordFromDraft } from '../engine/methodologyHelpers.js';
import {
  demoTopologyRules,
  demoLayerRules,
  demoZoneRules,
  demoConduitRules,
  demoBoundaryRules,
  demoTechnologyRules,
  demoAddressRules,
  demoPerformanceRules,
  demoStabilityRules,
  demoRedundancyRules,
  demoAccessRules,
  demoSelectionRules,
  demoDeploymentRules,
  demoSecurityRules,
  demoScenarioRules,
} from '../rules/index.js';

function getFirstNavigablePageKey(methodology) {
  const groups = methodology?.navigation ?? [];
  for (const group of groups) {
    if (group.children?.length) {
      return group.children[0].key;
    }
  }
  return 'home';
}

function createInitialCollections() {
  return {
    'project-goal': [
      {
        'project.name': '工业网络规划项目',
        'project.customer': '待填写客户名称',
        'project.industry': '离散制造',
        'project.scope': '整厂',
        'project.goal': '新建',
        'project.delivery': '网络规划方案、结果输出与实施建议。',
        'project.owner': '待填写负责人',
        'project.confirmStatus': '待确认',
      },
    ],
    'scope-definition': [
      {
        'overview.name': '主项目范围',
        'overview.space': '1 个厂区 / 若干车间 / 关键业务区域',
        'overview.distribution': '中心区与现场区混合分布',
        'overview.cross': '存在跨区访问',
        'overview.scale': '中等规模',
        'overview.note': '',
      },
    ],
    'business-description': [
      {
        'scene.name': '核心业务场景',
        'scene.mode': '周期通信',
        'scene.source': '上层系统',
        'scene.target': '现场控制对象',
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
        'asset.system': '控制系统',
        'asset.location': '现场控制柜',
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
        'env.interference': '一般工业干扰',
        'env.install': '机柜 + 桥架部署',
        'env.distance': '中心区到现场区 100m~500m',
        'env.medium': '工业以太网',
        'env.power': '稳定交流供电',
        'env.wireless': '无',
        'env.note': '',
      },
    ],
    'implementation-constraints': [
      {
        'constraint.name': '预算约束',
        'constraint.type': '预算',
        'constraint.required': '是',
        'constraint.scope': '整项目建设范围',
        'constraint.existing': '需兼顾现网继承与分阶段实施',
        'constraint.note': '',
      },
    ],
    'security-scenario': [
      {
        'secScenario.name': '本地生产场景',
        'secScenario.type': '本地生产',
        'secScenario.scope': '现场控制网络',
        'secScenario.remote': '无',
        'secScenario.external': '无',
        'secScenario.note': '',
      },
    ],
    'exposure-analysis': [
      {
        'secExposure.name': 'PLC-01',
        'secExposure.relatedScenario': '本地生产场景',
        'secExposure.type': '远程接入',
        'secExposure.source': '工程维护或远程维护入口',
        'secExposure.control': '基础账号口令与访问控制',
        'secExposure.risk': '中',
        'secExposure.note': '',
      },
    ],
    'consequence-analysis': [
      {
        'secConsequence.name': 'PLC-01',
        'secConsequence.relatedScenario': '本地生产场景',
        'secConsequence.type': '生产中断',
        'secConsequence.impact': '异常访问或误操作可能导致生产中断',
        'secConsequence.severity': '高',
        'secConsequence.recovery': '需人工恢复与现场排查',
        'secConsequence.note': '',
      },
    ],
    'baseline-check': [
      {
        'secBaseline.type': '边界防护',
        'secBaseline.object': 'PLC-01',
        'secBaseline.status': '已具备',
        'secBaseline.evidence': '已有基本网络隔离措施',
        'secBaseline.gap': '基本满足',
        'secBaseline.note': '',
      },
    ],
    'key-asset-analysis': [
      {
        'secKey.name': 'PLC-01',
        'secKey.type': '控制器',
        'secKey.reason': '直接影响生产连续性',
        'secKey.focus': '边界访问、变更控制与稳定运行',
        'secKey.priority': '高',
        'secKey.note': '',
      },
    ],
    'design-principles': [
      {
        'derive.ruleThemes': '场景规则 / 安全规则 / 技术选择规则',
        'principle.category': '区域划分思路',
        'principle.main': '优先按物理区域与业务边界划分',
        'principle.scope': '中心区、控制区、监控区与边界区',
        'principle.basis': '连续生产与边界治理要求',
        'principle.desc': '先明确边界，再收敛结构与接入方式',
        'principle.note': '',
      },
    ],
    'network-topology': [
      {
        'derive.ruleThemes': '拓扑规则 / 场景规则 / 冗余规则',
        'topology.object': '全厂主干网络',
        'topology.type': '星型',
        'topology.backbone': '中心交换节点统一汇聚',
        'topology.access': '现场控制柜和业务终端就近接入',
        'topology.scope': '中心区与现场区',
        'topology.basis': '便于实施、运维和后续扩展',
        'topology.tech': '工业以太网',
        'topology.note': '',
      },
    ],
    'layer-design': [
      {
        'derive.ruleThemes': '分层规则 / 场景规则',
        'layer.object': '车间汇聚层',
        'layer.mode': '二层',
        'layer.structure': '核心 / 汇聚 / 接入',
        'layer.policy': '按层组织访问与边界控制',
        'layer.scope': '中心区与车间区域',
        'layer.note': '',
      },
    ],
    'segmentation-plan': [
      {
        'seg.object': '控制区网段',
        'seg.purpose': '控制通信',
        'seg.range': '192.168.10.0/24',
        'seg.margin': '预留 20%',
        'seg.note': '',
      },
    ],
    'performance-design': [
      {
        'performance.object': '控制区主链路',
        'performance.latency': '毫秒级',
        'performance.bandwidth': '千兆',
        'performance.clock': '10ms 周期',
        'performance.measure': '关键控制流量优先保障',
        'performance.service': '控制通信',
        'performance.delay': '≤10ms',
        'performance.risk': '广播或异常访问影响时延',
        'performance.note': '',
      },
    ],
    'stability-design': [
      {
        'stability.object': '控制系统主链路',
        'stability.target': '连续稳定运行',
        'stability.risk': '误操作与边界异常',
        'stability.measure': '配置基线与变更审批',
        'stability.control': '日志审计与链路监测',
        'stability.maintain': '窗口期维护',
        'stability.note': '',
      },
    ],
    'redundancy-design': [
      {
        'redundancy.object': '主干光纤链路',
        'redundancy.target': '单点故障不中断业务',
        'redundancy.mode': '主备',
        'redundancy.switch': '故障自动或人工切换',
        'redundancy.note': '',
      },
    ],
    'access-design': [
      {
        'access.object': 'PLC-01',
        'access.type': '有线',
        'access.scope': '现场控制柜',
        'access.limit': '仅允许控制网络设备接入',
        'access.reason': '保证控制流量稳定与边界清晰',
        'access.note': '',
      },
    ],
    'selection-design': [
      {
        'selection.object': 'PLC-01',
        'selection.demand': '控制通信',
        'selection.capability': '工业协议支持、稳定运行、环境适应',
        'selection.result': '工业交换机接入',
        'selection.reason': '满足工业现场稳定性与维护要求',
        'selection.note': '',
      },
    ],
    'deployment-design': [
      {
        'deployment.object': 'PLC-01',
        'deployment.location': '主项目范围',
        'deployment.install': '',
        'deployment.cabling': '',
        'deployment.requirement': '',
        'deployment.note': '',
      },
    ],
    'link-design': [
      {
        'link.source': 'PLC-01',
        'link.target': 'SCADA-01',
        'link.scene': '核心业务场景',
        'link.type': '电口',
        'link.role': '接入链路',
        'link.redundant': '否',
        'link.sourceLocation': '',
        'link.targetLocation': '',
        'link.medium': '',
        'link.note': '',
      },
    ],
    'conduit-design': [
      {
        'derive.ruleThemes': '通道规则 / 安全规则',
        'conduit.source': '控制区',
        'conduit.target': '监控区',
        'conduit.scene': '核心业务场景',
        'conduit.purpose': '数据采集',
        'conduit.direction': '单向',
        'conduit.medium': '有线',
        'conduit.control': '受控开放',
        'conduit.delay': '毫秒级',
        'conduit.criticality': '高',
        'conduit.note': '',
      },
    ],
    'interconnect-design': [
      {
        'interconnect.source': '控制区',
        'interconnect.target': '监控区',
        'interconnect.structure': '边界设备互联',
        'interconnect.boundary': '',
        'interconnect.control': '',
        'interconnect.note': '',
      },
    ],
    'tech-selection': [
      {
        'derive.ruleThemes': '技术选择规则 / 性能规则 / 稳定性规则',
        'tech.name': '核心交换技术选择',
        'tech.category': '网络结构',
        'tech.technology': '工业以太网',
        'tech.scopeType': '区域',
        'tech.scopeTarget': '',
        'tech.scopeNote': '',
        'tech.goal': '',
        'tech.reason': '',
        'tech.alternative': '',
        'tech.alternativeReason': '',
        'tech.constraint': '',
        'tech.confirmStatus': '待确认',
        'tech.note': '',
      },
    ],
    'security-limit': [
      {
        'secLimit.name': '停机窗口限制',
        'secLimit.type': '停机窗口',
        'secLimit.object': '',
        'secLimit.required': '是',
        'secLimit.note': '',
      },
    ],
    'tech-selection': [
      {
        'tech.name': '核心交换技术选择',
        'tech.category': '网络结构',
        'tech.technology': '工业以太网',
        'tech.scopeType': '区域',
        'tech.scopeTarget': '',
        'tech.scopeNote': '',
        'tech.goal': '',
        'tech.reason': '',
        'tech.alternative': '',
        'tech.alternativeReason': '',
        'tech.constraint': '',
        'tech.confirmStatus': '待确认',
        'tech.note': '',
      },
    ],
    'delay-analysis': [
      {
        'delay.name': '控制区到监控区主链路',
        'delay.length': '',
        'delay.medium': '双绞线',
        'delay.hops': '',
        'delay.boundary': '无',
        'delay.dmz': '否',
        'delay.demand': '毫秒级',
        'delay.risk': '低',
        'delay.result': '',
      },
    ],
    'perf-evaluation': [
      {
        'perf.object': '控制区上联',
        'perf.type': '区域',
        'perf.load': '低',
        'perf.bandwidth': '百兆',
        'perf.path': '',
        'perf.risk': '低',
        'perf.result': '',
      },
    ],
    'topology-rules': demoTopologyRules,
    'layer-rules': demoLayerRules,
    'zone-rules': demoZoneRules,
    'conduit-rules': demoConduitRules,
    'boundary-rules': demoBoundaryRules,
    'technology-rules': demoTechnologyRules,
    'address-rules': demoAddressRules,
    'performance-rules': demoPerformanceRules,
    'stability-rules': demoStabilityRules,
    'redundancy-rules': demoRedundancyRules,
    'access-rules': demoAccessRules,
    'selection-rules': demoSelectionRules,
    'deployment-rules': demoDeploymentRules,
    'security-rules': demoSecurityRules,
    'scenario-rules': demoScenarioRules,
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
    'consequence-analysis': buildEmptyDraft([
      'secConsequence.name',
      'secConsequence.relatedScenario',
      'secConsequence.type',
      'secConsequence.impact',
      'secConsequence.severity',
      'secConsequence.recovery',
      'secConsequence.note',
    ]),
    'baseline-check': buildEmptyDraft([
      'secBaseline.type',
      'secBaseline.object',
      'secBaseline.status',
      'secBaseline.evidence',
      'secBaseline.gap',
      'secBaseline.note',
    ]),
    'key-asset-analysis': buildEmptyDraft([
      'secKey.name',
      'secKey.type',
      'secKey.reason',
      'secKey.focus',
      'secKey.priority',
      'secKey.note',
    ]),
    'design-principles': buildEmptyDraft([
      'principle.category',
      'principle.main',
      'principle.scope',
      'principle.basis',
      'principle.desc',
      'principle.note',
    ]),
    'network-topology': buildEmptyDraft([
      'topology.object',
      'topology.type',
      'topology.backbone',
      'topology.access',
      'topology.scope',
      'topology.basis',
      'topology.tech',
      'topology.note',
    ]),
    'layer-design': buildEmptyDraft([
      'layer.object',
      'layer.mode',
      'layer.structure',
      'layer.policy',
      'layer.scope',
      'layer.note',
    ]),
    'segmentation-plan': buildEmptyDraft([
      'seg.object',
      'seg.purpose',
      'seg.range',
      'seg.margin',
      'seg.note',
    ]),
    'performance-design': buildEmptyDraft([
      'performance.object',
      'performance.latency',
      'performance.bandwidth',
      'performance.clock',
      'performance.measure',
      'performance.service',
      'performance.delay',
      'performance.risk',
      'performance.note',
    ]),
    'stability-design': buildEmptyDraft([
      'stability.object',
      'stability.target',
      'stability.risk',
      'stability.measure',
      'stability.control',
      'stability.maintain',
      'stability.note',
    ]),
    'redundancy-design': buildEmptyDraft([
      'redundancy.object',
      'redundancy.target',
      'redundancy.mode',
      'redundancy.switch',
      'redundancy.note',
    ]),
    'access-design': buildEmptyDraft([
      'access.object',
      'access.type',
      'access.scope',
      'access.limit',
      'access.reason',
      'access.note',
    ]),
    'selection-design': buildEmptyDraft([
      'selection.object',
      'selection.demand',
      'selection.capability',
      'selection.result',
      'selection.reason',
      'selection.note',
    ]),
    'deployment-design': buildEmptyDraft([
      'deployment.object',
      'deployment.location',
      'deployment.install',
      'deployment.cabling',
      'deployment.requirement',
      'deployment.note',
    ]),
    'link-design': buildEmptyDraft([
      'link.source',
      'link.target',
      'link.scene',
      'link.type',
      'link.role',
      'link.redundant',
      'link.sourceLocation',
      'link.targetLocation',
      'link.medium',
      'link.note',
    ]),
    'conduit-design': buildEmptyDraft([
      'conduit.source',
      'conduit.target',
      'conduit.scene',
      'conduit.purpose',
      'conduit.direction',
      'conduit.medium',
      'conduit.control',
      'conduit.delay',
      'conduit.criticality',
      'conduit.note',
    ]),
    'interconnect-design': buildEmptyDraft([
      'interconnect.source',
      'interconnect.target',
      'interconnect.structure',
      'interconnect.boundary',
      'interconnect.control',
      'interconnect.note',
    ]),
    'tech-selection': buildEmptyDraft([
      'tech.name',
      'tech.category',
      'tech.technology',
      'tech.scopeType',
      'tech.scopeTarget',
      'tech.scopeNote',
      'tech.goal',
      'tech.reason',
      'tech.alternative',
      'tech.alternativeReason',
      'tech.constraint',
      'tech.confirmStatus',
      'tech.note',
    ]),
    'security-limit': buildEmptyDraft([
      'secLimit.name',
      'secLimit.type',
      'secLimit.object',
      'secLimit.required',
      'secLimit.note',
    ]),
    'tech-selection': buildEmptyDraft([
      'tech.name',
      'tech.category',
      'tech.technology',
      'tech.scopeType',
      'tech.scopeTarget',
      'tech.scopeNote',
      'tech.goal',
      'tech.reason',
      'tech.alternative',
      'tech.alternativeReason',
      'tech.constraint',
      'tech.confirmStatus',
      'tech.note',
    ]),
    'delay-analysis': buildEmptyDraft([
      'delay.name',
      'delay.length',
      'delay.medium',
      'delay.hops',
      'delay.boundary',
      'delay.dmz',
      'delay.demand',
      'delay.risk',
      'delay.result',
    ]),
    'perf-evaluation': buildEmptyDraft([
      'perf.object',
      'perf.type',
      'perf.load',
      'perf.bandwidth',
      'perf.path',
      'perf.risk',
      'perf.result',
    ]),
    'topology-rules': buildEmptyDraft([
      'planningRule.name',
      'planningRule.domain',
      'planningRule.category',
      'planningRule.trigger',
      'planningRule.scene',
      'planningRule.recommend',
      'planningRule.avoid',
      'planningRule.reason',
      'planningRule.scope',
      'planningRule.example',
      'planningRule.note',
    ]),
    'layer-rules': buildEmptyDraft([
      'planningRule.name',
      'planningRule.domain',
      'planningRule.category',
      'planningRule.trigger',
      'planningRule.scene',
      'planningRule.recommend',
      'planningRule.avoid',
      'planningRule.reason',
      'planningRule.scope',
      'planningRule.example',
      'planningRule.note',
    ]),
    'scenario-rules': buildEmptyDraft([
      'planningRule.name',
      'planningRule.domain',
      'planningRule.category',
      'planningRule.trigger',
      'planningRule.scene',
      'planningRule.recommend',
      'planningRule.avoid',
      'planningRule.reason',
      'planningRule.scope',
      'planningRule.example',
      'planningRule.note',
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
    'consequence-analysis': 0,
    'baseline-check': 0,
    'key-asset-analysis': 0,
    'design-principles': 0,
    'network-topology': 0,
    'layer-design': 0,
    'segmentation-plan': 0,
    'performance-design': 0,
    'stability-design': 0,
    'redundancy-design': 0,
    'access-design': 0,
    'selection-design': 0,
    'deployment-design': 0,
    'link-design': 0,
    'conduit-design': 0,
    'interconnect-design': 0,
    'tech-selection': 0,
    'security-limit': 0,
    'tech-selection': 0,
    'delay-analysis': 0,
    'perf-evaluation': 0,
    'topology-rules': 0,
    'layer-rules': 0,
    'scenario-rules': 0,
  };
}

function createInitialExpandedGroups() {
  return {
    'how-to-ask': false,
    'how-to-judge': false,
    'how-to-derive': false,
    'how-to-land': false,
    'how-to-iterate': false,
    'for-customer': false,
    'for-internal': false,
    'security-design': false,
    'network-design': false,
    'engineering-design': false,
    'security-requirements': false,
  };
}

function createLoadedExpandedGroups() {
  return {
    'how-to-ask': true,
    'how-to-judge': true,
    'how-to-derive': true,
    'how-to-land': true,
    'how-to-iterate': true,
    'for-customer': false,
    'for-internal': false,
    'security-design': false,
    'network-design': false,
    'engineering-design': false,
    'security-requirements': false,
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
      resetToHomeView() {
        setActivePageKey('home');
        setExpandedGroups(createInitialExpandedGroups());
      },
      selectMethodology(methodology) {
        setCurrentMethodology(methodology);
        setExpandedGroups(createLoadedExpandedGroups());
        setFormData(buildInitialFormData(methodology.fields ?? {}));
        setRecordCollections(createInitialCollections());
        setRecordDrafts(createInitialDrafts());
        setSelectedRecordIndexMap(createInitialSelections());
        setActivePageKey('home');
      },
      toggleExpanded(key) {
        setExpandedGroups((current) => {
          const nextValue = !current[key];
          const nextState = Object.keys(current).reduce((accumulator, currentKey) => {
            accumulator[currentKey] = false;
            return accumulator;
          }, {});
          nextState[key] = nextValue;
          return nextState;
        });
      },
      setExpandedWithinLevel(levelKeys, targetKey) {
        setExpandedGroups((current) => {
          const nextValue = !current[targetKey];
          const nextState = { ...current };

          levelKeys.forEach((key) => {
            nextState[key] = false;
          });

          nextState[targetKey] = nextValue;
          return nextState;
        });
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
        const rulePageKeys = new Set(
          (currentMethodology?.navigation ?? [])
            .filter((group) => group.key === 'how-to-judge')
            .flatMap((group) => group.children?.map((child) => child.key) ?? []),
        );

        setFormData((current) => ({
          ...current,
          ...(caseData.formData ?? {}),
        }));

        setRecordCollections((current) => {
          const nextCaseCollections = Object.fromEntries(
            Object.entries(caseData.recordCollections ?? {}).filter(([pageKey]) => !rulePageKeys.has(pageKey)),
          );

          return {
            ...current,
            ...nextCaseCollections,
          };
        });

        setSelectedRecordIndexMap(createInitialSelections());
        setActivePageKey(getFirstNavigablePageKey(currentMethodology));
      },
    }),
    [currentMethodology, recordDrafts, selectedRecordIndexMap],
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
