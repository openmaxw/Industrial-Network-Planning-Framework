export const isa95Methodology = {
  meta: {
    key: 'isa95',
    title: 'ISA95 经验框架',
    subtitle: '工业企业层级与业务协同建模',
    version: '0.2.0',
    description: '用于沉淀以企业层级、业务流程、对象分配和系统协同为核心的 ISA95 规划经验。',
  },
  systemPages: {
    home: {
      title: '首页',
      type: 'home',
      description: '用于展示系统简介、经验信息、案例入口和导入导出能力。',
    },
  },
  navigation: [
    {
      key: 'how-to-ask',
      title: '资料采集',
      children: [
        { key: 'enterprise-basic', title: '企业信息' },
        { key: 'site-structure', title: '站点结构' },
        { key: 'business-process', title: '业务流程' },
        { key: 'asset-allocation', title: '对象分配' },
      ],
    },
    {
      key: 'how-to-judge',
      title: '判断依据',
      children: [{ key: 'isa95-rules', title: '建模规则' }],
    },
    {
      key: 'how-to-derive',
      title: '设计推演',
      children: [{ key: 'isa95-design', title: '协同设计' }],
    },
    {
      key: 'how-to-land',
      title: '结果落地',
      children: [
        { key: 'isa95-summary', title: '现场概述' },
        { key: 'isa95-design-result', title: '设计说明' },
        { key: 'isa95-topology', title: '协同结构' },
        { key: 'isa95-review', title: '规划复盘' },
        { key: 'isa95-case-summary', title: '案例提炼' },
      ],
    },
    {
      key: 'how-to-iterate',
      title: '经验迭代',
      children: [
        { key: 'special-judgements', title: '特殊判断' },
        { key: 'experience-candidates', title: '经验候选' },
        { key: 'iteration-summary', title: '迭代总结' },
      ],
    },
  ],
  pages: {
    'enterprise-basic': {
      title: '企业信息',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于定义企业、工厂与组织层级背景。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '企业信息记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['enterprise.name', 'enterprise.scope', 'enterprise.level', 'enterprise.goal'],
      fields: ['enterprise.name', 'enterprise.scope', 'enterprise.level', 'enterprise.goal'],
    },
    'site-structure': {
      title: '站点结构',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于定义企业、区域、产线等层级结构。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '站点结构记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['site.nodeName', 'site.nodeType', 'site.parentNode'],
      fields: ['site.nodeName', 'site.nodeType', 'site.parentNode', 'site.responsibility'],
    },
    'business-process': {
      title: '业务流程',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于描述业务活动、生产流程与协同关系。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '业务流程记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['process.name', 'process.owner', 'process.zoneRef'],
      fields: ['process.name', 'process.owner', 'process.zoneRef', 'process.input', 'process.output'],
    },
    'asset-allocation': {
      title: '对象分配',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于描述对象与层级节点的对应关系。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '对象分配记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['asset.name', 'asset.siteRef', 'asset.role'],
      fields: ['asset.name', 'asset.siteRef', 'asset.role', 'asset.interface'],
    },
    'isa95-rules': {
      title: '建模规则',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于沉淀 ISA95 场景下的层级、对象与流程建模规则。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '建模规则记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['planningRule.condition', 'planningRule.action', 'planningRule.scene'],
      fields: ['planningRule.condition', 'planningRule.action', 'planningRule.scene', 'planningRule.name'],
    },
    'isa95-design': {
      title: '协同设计',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于整理 ISA95 视角下的系统协同与部署组织。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '协同设计记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['isa95.designPrinciple', 'isa95.integrationPath', 'isa95.boundary'],
      fields: ['isa95.designPrinciple', 'isa95.integrationPath', 'isa95.boundary', 'derive.iterationFlag', 'derive.iterationNote', 'derive.candidateSuggestion'],
    },
    'isa95-summary': {
      title: '建模摘要',
      type: 'output',
      layout: 'summary-output',
      description: '汇总企业建模、流程建模、对象分配与协同设计结果。',
      sections: [
        { key: 'enterprise-summary', kind: 'key-value-summary', title: '企业摘要' },
        { key: 'site-summary', kind: 'record-summary', title: '站点结构摘要' },
        { key: 'process-summary', kind: 'record-summary', title: '业务流程摘要' },
        { key: 'asset-summary', kind: 'record-summary', title: '对象分配摘要' },
      ],
    },
    'isa95-review': {
      title: '规划复盘',
      type: 'output',
      layout: 'summary-output',
      description: '用于从内部角度复盘 ISA95 项目中的层级划分、流程组织和系统协同逻辑。',
      sections: [
        { key: 'isa95-review-positioning', kind: 'text-summary', title: '1. 项目定位' },
        { key: 'isa95-review-rules', kind: 'text-summary', title: '2. 关键规则' },
        { key: 'isa95-review-derivation', kind: 'text-summary', title: '3. 推演过程' },
      ],
    },
    'special-judgements': {
      title: '特殊判断',
      type: 'record-collection',
      layout: 'list-form',
      description: '用于记录本项目中超出既有规则库的特殊判断。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '特殊判断列表' },
        { key: 'record-editor', kind: 'record-editor', title: '录入区' },
      ],
      summaryColumns: ['iteration.name', 'iteration.sourcePage', 'iteration.action'],
      fields: ['iteration.name', 'iteration.sourcePage', 'iteration.reason', 'iteration.action', 'iteration.reuse'],
    },
    'experience-candidates': {
      title: '经验候选',
      type: 'record-collection',
      layout: 'list-form',
      description: '用于记录建议回写到经验库的候选项。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '经验候选列表' },
        { key: 'record-editor', kind: 'record-editor', title: '录入区' },
      ],
      summaryColumns: ['candidate.name', 'candidate.target', 'candidate.status'],
      fields: ['candidate.name', 'candidate.target', 'candidate.condition', 'candidate.suggestion', 'candidate.status'],
    },
    'iteration-summary': {
      title: '迭代总结',
      type: 'output',
      layout: 'summary-output',
      description: '用于汇总本项目中的特殊判断、经验候选与回写建议。',
      sections: [
        { key: 'iteration-summary-special', kind: 'record-summary', title: '1. 特殊判断汇总' },
        { key: 'iteration-summary-candidate', kind: 'record-summary', title: '2. 经验候选汇总' },
        { key: 'iteration-summary-next', kind: 'text-summary', title: '3. 回写建议' },
      ],
    },
  },
  fields: {
    'enterprise.name': { label: '企业名称', type: 'text', defaultValue: '示例制造集团' },
    'enterprise.scope': { label: '建模范围', type: 'text', defaultValue: '总部到产线' },
    'enterprise.level': { label: '层级重点', type: 'select', defaultValue: 'L3-L4', options: ['L0-L1', 'L2-L3', 'L3-L4'] },
    'enterprise.goal': { label: '建设目标', type: 'text', defaultValue: '打通业务层级与执行协同关系' },
    'site.nodeName': { label: '节点名称', type: 'text', defaultValue: '' },
    'site.nodeType': { label: '节点类型', type: 'select', defaultValue: '工厂', options: ['集团', '工厂', '车间', '产线', '单元'] },
    'site.parentNode': { label: '上级节点', type: 'select', defaultValue: '', optionsSource: { type: 'record-field', recordPage: 'site-structure', field: 'site.nodeName', dedupe: true } },
    'site.responsibility': { label: '主要职责', type: 'text', defaultValue: '' },
    'process.name': { label: '流程名称', type: 'text', defaultValue: '' },
    'process.owner': { label: '流程归属', type: 'text', defaultValue: '' },
    'process.zoneRef': {
      label: '关联层级节点',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'site-structure', field: 'site.nodeName', dedupe: true },
    },
    'process.input': { label: '输入', type: 'text', defaultValue: '' },
    'process.output': { label: '输出', type: 'text', defaultValue: '' },
    'asset.name': { label: '对象名称', type: 'text', defaultValue: '' },
    'asset.siteRef': {
      label: '所属节点',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'site-structure', field: 'site.nodeName', dedupe: true },
    },
    'asset.role': { label: '对象角色', type: 'select', defaultValue: '生产协同对象', options: ['生产协同对象', '控制对象', '数据采集对象', '接口对象', '管理对象'] },
    'asset.interface': { label: '主要接口', type: 'text', defaultValue: '' },
    'planningRule.name': { label: '规则名称', type: 'text', defaultValue: '' },
    'planningRule.scene': { label: '适用场景', type: 'text', defaultValue: '' },
    'planningRule.condition': { label: '触发条件', type: 'textarea', defaultValue: '' },
    'planningRule.action': { label: '推荐动作', type: 'textarea', defaultValue: '' },
    'isa95.designPrinciple': { label: '设计原则', type: 'textarea', defaultValue: '按层级、职责和接口方向组织系统协同关系。' },
    'isa95.integrationPath': { label: '协同路径', type: 'textarea', defaultValue: 'ERP-MES-产线执行系统按职责边界逐层协同。' },
    'isa95.boundary': { label: '边界说明', type: 'textarea', defaultValue: '业务协同边界与控制边界应保持清晰。' },
  },
  outputs: {
    'isa95-summary': {
      'enterprise-summary': ['enterprise.name', 'enterprise.scope', 'enterprise.level', 'enterprise.goal'],
      'site-summary': { recordPage: 'site-structure', fields: ['site.nodeName', 'site.nodeType', 'site.parentNode'] },
      'process-summary': { recordPage: 'business-process', fields: ['process.name', 'process.owner', 'process.zoneRef'] },
      'asset-summary': { recordPage: 'asset-allocation', fields: ['asset.name', 'asset.siteRef', 'asset.role'] },
    },
    'isa95-review': {
      'isa95-review-positioning': {
        lines: [
          { type: 'field-join', label: '项目基础', fields: ['enterprise.name', 'enterprise.scope', 'enterprise.level', 'enterprise.goal'] },
        ],
      },
      'isa95-review-rules': {
        bullets: [
          { type: 'record-join', label: '建模规则', recordPage: 'isa95-rules', fields: ['planningRule.name', 'planningRule.scene', 'planningRule.action'], separator: '；' },
        ],
      },
      'isa95-review-derivation': {
        paragraphs: [
          { type: 'template', parts: [{ kind: 'text', value: '本项目先梳理企业层级，再梳理业务流程，最后将系统对象映射到相应层级与职责边界。' }] },
          { type: 'field-join', label: '协同设计', fields: ['isa95.designPrinciple', 'isa95.integrationPath', 'isa95.boundary', 'derive.iterationFlag', 'derive.iterationNote', 'derive.candidateSuggestion'] },
        ],
      },
      'isa95-review-decisions': {
        bullets: [
          { type: 'record-join', label: '对象分配', recordPage: 'asset-allocation', fields: ['asset.name', 'asset.siteRef', 'asset.role'], separator: '；' },
        ],
      },
      'isa95-review-reuse': {
        bullets: [
          { type: 'record-join', label: '经验候选', recordPage: 'experience-candidates', fields: ['candidate.name', 'candidate.target', 'candidate.status'], separator: '；' },
          { type: 'template', parts: [{ kind: 'text', value: '本案例适合作为企业层级、业务协同与对象分配类 ISA95 项目的参考样本。' }] },
        ],
      },
    },
  },
  cases: [
    {
      key: 'isa95-case-1',
      title: '案例：制造集团层级梳理',
      description: '聚焦企业、工厂、产线层级与业务流程映射。',
      formData: {
        'enterprise.name': '某制造集团',
        'enterprise.scope': '总部-工厂-产线',
        'enterprise.level': 'L3-L4',
        'enterprise.goal': '建立集团到工厂的业务协同模型',
        'isa95.designPrinciple': '按企业职责、层级边界与系统接口逐层展开。',
        'isa95.integrationPath': 'ERP → MES → WMS / 产线系统',
        'isa95.boundary': '业务信息流与控制信息流边界清晰。',
      },
      recordCollections: {
        'enterprise-basic': [
          { 'enterprise.name': '某制造集团', 'enterprise.scope': '总部-工厂-产线', 'enterprise.level': 'L3-L4', 'enterprise.goal': '建立集团到工厂的业务协同模型' },
        ],
        'special-judgements': [
          { 'iteration.name': '项目特例判断', 'iteration.sourcePage': '设计推演', 'iteration.reason': '存在超出既有规则的现场约束', 'iteration.action': '采用项目特例方案并单独记录', 'iteration.reuse': '可在同类项目中复用，但需增加适用边界说明' },
        ],
        'experience-candidates': [
          { 'candidate.name': '新增经验候选', 'candidate.target': '判断依据', 'candidate.condition': '同类场景重复出现', 'candidate.suggestion': '整理为正式规则并补充触发条件', 'candidate.status': '待评审' },
        ],
        'site-structure': [
          { 'site.nodeName': '总装工厂', 'site.nodeType': '工厂', 'site.parentNode': '集团总部', 'site.responsibility': '负责整车总装制造' },
          { 'site.nodeName': '焊装产线', 'site.nodeType': '产线', 'site.parentNode': '总装工厂', 'site.responsibility': '执行焊接工艺' },
        ],
        'business-process': [
          { 'process.name': '订单到生产执行', 'process.owner': '制造与计划部门', 'process.zoneRef': '总装工厂', 'process.input': '订单与生产计划', 'process.output': '生产任务与执行反馈' },
        ],
        'asset-allocation': [
          { 'asset.name': 'MES 服务', 'asset.siteRef': '总装工厂', 'asset.role': '生产协同对象', 'asset.interface': 'ERP / WMS / SCADA' },
        ],
        'isa95-rules': [
          { 'planningRule.name': '先层级后对象', 'planningRule.scene': '大型制造集团', 'planningRule.condition': '系统对象较多且跨工厂协同', 'planningRule.action': '先明确层级结构，再映射对象关系与接口职责' },
        ],
        'isa95-design': [
          {
            'isa95.designPrinciple': '按企业职责、层级边界与接口方向逐层展开。',
            'isa95.integrationPath': 'ERP → MES → WMS / 产线系统',
            'isa95.boundary': '业务信息流与控制信息流边界清晰。',
            'derive.iterationFlag': '是',
            'derive.iterationNote': '集团多工厂场景下需先统一层级口径，再组织接口边界。',
            'derive.candidateSuggestion': '补充集团多工厂 ISA95 建模经验。',
          },
        ],
      },
    },
  ],
};
