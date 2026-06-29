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
    'consequence-analysis': [
      {
        'secConsequence.name': 'PLC-01',
        'secConsequence.relatedScenario': '',
        'secConsequence.type': '生产中断',
        'secConsequence.impact': '',
        'secConsequence.severity': '高',
        'secConsequence.recovery': '',
        'secConsequence.note': '',
      },
    ],
    'baseline-check': [
      {
        'secBaseline.type': '边界防护',
        'secBaseline.object': 'PLC-01',
        'secBaseline.status': '已具备',
        'secBaseline.evidence': '',
        'secBaseline.gap': '基本满足',
        'secBaseline.note': '',
      },
    ],
    'key-asset-analysis': [
      {
        'secKey.name': 'PLC-01',
        'secKey.type': '控制器',
        'secKey.reason': '',
        'secKey.focus': '',
        'secKey.priority': '高',
        'secKey.note': '',
      },
    ],
    'design-principles': [
      {
        'principle.category': '区域划分思路',
        'principle.main': '优先按物理区域与业务边界划分',
        'principle.scope': '',
        'principle.basis': '',
        'principle.desc': '',
        'principle.note': '',
      },
    ],
    'network-topology': [
      {
        'topology.object': '全厂主干网络',
        'topology.type': '星型',
        'topology.backbone': '',
        'topology.access': '',
        'topology.scope': '',
        'topology.basis': '',
        'topology.tech': '',
        'topology.note': '',
      },
    ],
    'layer-design': [
      {
        'layer.object': '车间汇聚层',
        'layer.mode': '二层',
        'layer.structure': '',
        'layer.policy': '',
        'layer.scope': '',
        'layer.note': '',
      },
    ],
    'segmentation-plan': [
      {
        'seg.object': '控制区网段',
        'seg.purpose': '控制通信',
        'seg.range': '',
        'seg.margin': '',
        'seg.note': '',
      },
    ],
    'performance-design': [
      {
        'performance.object': '控制区主链路',
        'performance.latency': '毫秒级',
        'performance.bandwidth': '千兆',
        'performance.clock': '',
        'performance.measure': '',
        'performance.service': '',
        'performance.delay': '',
        'performance.risk': '',
        'performance.note': '',
      },
    ],
    'stability-design': [
      {
        'stability.object': '控制系统主链路',
        'stability.target': '',
        'stability.risk': '',
        'stability.measure': '',
        'stability.control': '',
        'stability.maintain': '',
        'stability.note': '',
      },
    ],
    'redundancy-design': [
      {
        'redundancy.object': '主干光纤链路',
        'redundancy.target': '',
        'redundancy.mode': '主备',
        'redundancy.switch': '',
        'redundancy.note': '',
      },
    ],
    'access-design': [
      {
        'access.object': 'PLC-01',
        'access.type': '有线',
        'access.scope': '',
        'access.limit': '',
        'access.reason': '',
        'access.note': '',
      },
    ],
    'selection-design': [
      {
        'selection.object': 'PLC-01',
        'selection.demand': '控制通信',
        'selection.capability': '',
        'selection.result': '',
        'selection.reason': '',
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
    'topology-rules': [
      {
        'planningRule.name': '线型对象优先环网',
        'planningRule.domain': '网络设计',
        'planningRule.category': '拓扑设计',
        'planningRule.trigger': '设备沿产线或输送链路线性分布，且业务连续性要求高。',
        'planningRule.scene': '线型产线 / 连续排布设备 / 冗余要求高',
        'planningRule.recommend': '优先采用工业环网，并明确冗余切换方式和边界节点位置。',
        'planningRule.avoid': '避免在对象高度集中场景中机械套用环网，导致链路复杂度增加。',
        'planningRule.reason': '环网更适合线型部署，布线顺势且能兼顾冗余。',
        'planningRule.impact': '影响网络拓扑、交换机选型、链路设计、冗余设计。',
        'planningRule.example': '汽车焊装线、输送线、包装线等沿线设备网络。',
        'planningRule.note': '若存在多个线体汇聚，应与分层规则结合判断。',
      },
      {
        'planningRule.name': '集中对象优先星型',
        'planningRule.domain': '网络设计',
        'planningRule.category': '拓扑设计',
        'planningRule.trigger': '设备集中分布，上联关系清晰，现场布线条件较好。',
        'planningRule.scene': '集中设备区 / 机柜集中 / 单房间部署',
        'planningRule.recommend': '优先采用星型结构，由接入层或对象直接上联中心节点。',
        'planningRule.avoid': '避免为了形式统一强行做环网，增加不必要的节点和维护复杂度。',
        'planningRule.reason': '星型结构最直接，便于故障定位和容量管理。',
        'planningRule.impact': '影响拓扑形态、布线方式、中心交换设备接口规划。',
        'planningRule.example': '监控室、机房、集中控制室等对象集中场景。',
        'planningRule.note': '若中心节点成为单点，应结合冗余规则进一步处理。',
      },
      {
        'planningRule.name': '多区域场景优先混合拓扑',
        'planningRule.domain': '网络设计',
        'planningRule.category': '拓扑设计',
        'planningRule.trigger': '厂区存在多个功能区、多个车间或多楼栋分布。',
        'planningRule.scene': '多区域厂区 / 多车间 / 多楼栋',
        'planningRule.recommend': '优先采用核心汇聚星型 + 区域内部局部环网或星型的混合拓扑。',
        'planningRule.avoid': '避免用单一拓扑覆盖全厂，导致结构过大且边界不清。',
        'planningRule.reason': '混合拓扑更适合兼顾区域差异、扩展性和边界管理。',
        'planningRule.impact': '影响总体拓扑、分层设计、区域互联和边界实现。',
        'planningRule.example': '整厂级制造网络、公用工程 + 生产控制混合网络。',
        'planningRule.note': '应先明确区域边界，再决定区域内部采用何种局部拓扑。',
      },
    ],
    'layer-rules': [
      {
        'planningRule.name': '大规模厂区引入汇聚层',
        'planningRule.domain': '网络设计',
        'planningRule.category': '分层设计',
        'planningRule.trigger': '厂区范围大、对象数量多、跨区域布线明显。',
        'planningRule.scene': '大规模厂区 / 多车间 / 多楼栋',
        'planningRule.recommend': '设置汇聚层，按区域或功能块汇聚后再上联核心层。',
        'planningRule.avoid': '避免所有接入点直接上联核心，造成核心口数和管理复杂度失控。',
        'planningRule.reason': '汇聚层有利于控制规模、清晰层级并降低主干复杂度。',
        'planningRule.impact': '影响分层结构、主干布线、交换机数量与容量规划。',
        'planningRule.example': '整厂级项目、跨楼栋项目、多个系统统一汇聚项目。',
        'planningRule.note': '汇聚层划分应尽量与区域或系统边界保持一致。',
      },
      {
        'planningRule.name': '小规模场景接入可直上核心',
        'planningRule.domain': '网络设计',
        'planningRule.category': '分层设计',
        'planningRule.trigger': '对象数量有限、布线资源充足、核心接口能力足够。',
        'planningRule.scene': '小规模厂区 / 单车间 / 集中部署',
        'planningRule.recommend': '采用两层甚至单层简化结构，接入层可直接上联核心。',
        'planningRule.avoid': '避免为了形式追求完整三层，导致结构虚胖。',
        'planningRule.reason': '简化结构便于实施、维护和故障定位，也更经济。',
        'planningRule.impact': '影响核心接口规划、布线方式、设备数量和维护复杂度。',
        'planningRule.example': '单产线改造、单控制室、小型能源站。',
        'planningRule.note': '若后续扩展可能较大，应预留向汇聚层演进的空间。',
      },
      {
        'planningRule.name': '多系统汇聚场景分层优先按功能划分',
        'planningRule.domain': '网络设计',
        'planningRule.category': '分层设计',
        'planningRule.trigger': 'MES、SCADA、历史库、FMCS 等多个系统同时接入。',
        'planningRule.scene': '多系统汇聚 / 平台集中监控 / 上下游系统集成',
        'planningRule.recommend': '优先按系统角色和访问关系分层，再确定核心与汇聚职责。',
        'planningRule.avoid': '避免单纯按设备数量分层，忽略系统交互特征。',
        'planningRule.reason': '功能驱动的分层更利于后续边界控制和运维管理。',
        'planningRule.impact': '影响分层逻辑、区域划分、边界设计和技术选择。',
        'planningRule.example': 'MES 与产线控制系统、FMCS 与公用工程子系统汇聚。',
        'planningRule.note': '建议与区域与边界规则联动判断。',
      },
    ],
    'scenario-rules': [
      {
        'planningRule.name': '小规模集中场景优先简化结构',
        'planningRule.domain': '场景规划',
        'planningRule.category': '场景规则',
        'planningRule.trigger': '项目对象集中、系统规模小、工期和预算要求紧。',
        'planningRule.scene': '小规模集中部署 / 单区域项目',
        'planningRule.recommend': '优先采用简化拓扑与简化分层，减少不必要中间层。',
        'planningRule.avoid': '避免照搬大厂区架构，造成结构和设备配置过重。',
        'planningRule.reason': '小规模项目更重视快速落地和清晰维护。',
        'planningRule.impact': '影响拓扑、分层、设备选型与实施策略。',
        'planningRule.example': '单车间改造、独立站房、小型站点网络。',
        'planningRule.note': '若后续扩展预期大，可在地址和接口上预留余量。',
      },
      {
        'planningRule.name': '线型产线场景优先沿线组织网络',
        'planningRule.domain': '场景规划',
        'planningRule.category': '场景规则',
        'planningRule.trigger': '对象沿生产节拍方向顺序排布，现场布线路径明确。',
        'planningRule.scene': '汽车产线 / 包装产线 / 输送产线',
        'planningRule.recommend': '按线体组织网络，优先沿线布局节点，再结合冗余要求决定环网或分段星型。',
        'planningRule.avoid': '避免只按房间或机柜组织网络，忽略生产链路的连续性。',
        'planningRule.reason': '沿线组织更符合现场物理布局和故障排查路径。',
        'planningRule.impact': '影响拓扑、部署位置、链路设计和维护路径。',
        'planningRule.example': '焊装线、装配线、输送系统网络。',
        'planningRule.note': '需要同时参考拓扑规则与冗余设计。',
      },
      {
        'planningRule.name': '远程运维场景优先先定边界再定结构',
        'planningRule.domain': '场景规划',
        'planningRule.category': '场景规则',
        'planningRule.trigger': '项目涉及第三方维护、远程访问或跨域调试。',
        'planningRule.scene': '远程运维 / 跨域访问 / 第三方维护',
        'planningRule.recommend': '先明确访问边界、控制点和路径，再决定拓扑、分层与地址策略。',
        'planningRule.avoid': '避免先把网络连通，再事后补访问控制。',
        'planningRule.reason': '远程运维场景中，边界和访问路径决定了后续结构约束。',
        'planningRule.impact': '影响区域划分、边界设计、技术选择和输出文档重点。',
        'planningRule.example': '供应商远程维护、总部远程监控、跨厂区支持场景。',
        'planningRule.note': '此类规则后续应与安全规则页进一步联动。',
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
      'planningRule.impact',
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
      'planningRule.impact',
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
      'planningRule.impact',
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
