export const systemMesMethodology = {
  meta: {
    key: 'system-mes',
    title: 'MES 经验框架',
    subtitle: '面向 MES 场景的对象关系与网络依赖梳理',
    version: '0.1.0',
    description: '用于沉淀 MES 系统在业务流程、系统依赖与接口边界上的规划经验。',
  },
  systemPages: {
    home: { title: '首页', type: 'home', description: '用于展示系统简介、经验信息、案例入口和导入导出能力。' },
  },
  navigation: [
    { key: 'how-to-ask', title: '资料采集', children: [{ key: 'mes-scope', title: 'MES 范围' }, { key: 'mes-dependencies', title: '系统依赖' }] },
    { key: 'how-to-judge', title: '判断依据', children: [{ key: 'mes-rules', title: '接口规则' }] },
    { key: 'how-to-derive', title: '设计推演', children: [{ key: 'mes-design', title: '部署组织' }] },
    { key: 'how-to-land', title: '结果落地', children: [{ key: 'mes-summary', title: '规划摘要' }] },
  ],
  pages: {
    'mes-scope': { title: 'MES 范围', type: 'standard-record', layout: 'single-form', description: '用于定义 MES 的业务边界。', fields: ['mes.scope', 'mes.goal', 'mes.owner'] },
    'mes-dependencies': {
      title: '系统依赖', type: 'record-collection', layout: 'list-form', description: '用于定义 MES 依赖的上下游系统。',
      sections: [{ key: 'record-list', kind: 'record-list', title: '依赖列表' }, { key: 'record-editor', kind: 'record-editor', title: '录入区' }],
      fields: ['mes.depSystem', 'mes.depType', 'mes.depDirection'],
    },
    'mes-rules': {
      title: '接口规则', type: 'record-collection', layout: 'list-form', description: '用于沉淀 MES 常见接口与部署规则。',
      sections: [{ key: 'record-list', kind: 'record-list', title: '规则列表' }, { key: 'record-editor', kind: 'record-editor', title: '录入区' }],
      summaryColumns: ['planningRule.name', 'planningRule.scene', 'planningRule.action'],
      fields: ['planningRule.name', 'planningRule.scene', 'planningRule.condition', 'planningRule.action'],
    },
    'mes-design': { title: '部署组织', type: 'standard-record', layout: 'single-form', description: '用于说明 MES 部署与网络依赖。', fields: ['mes.deploy', 'mes.interface', 'mes.security', 'derive.iterationFlag', 'derive.iterationNote', 'derive.candidateSuggestion'] },
    'mes-summary': {
      title: '规划摘要', type: 'output', layout: 'summary-output', description: '汇总 MES 经验配置的关键内容。',
      sections: [
        { key: 'mes-summary-basic', kind: 'key-value-summary', title: '范围摘要' },
        { key: 'mes-summary-dependencies', kind: 'record-summary', title: '依赖摘要' },
        { key: 'mes-summary-rules', kind: 'record-summary', title: '规则摘要' },
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
    'mes.scope': { label: '业务范围', type: 'text', defaultValue: '生产执行与数据采集' },
    'mes.goal': { label: '建设目标', type: 'text', defaultValue: '打通计划、执行与追溯链路' },
    'mes.owner': { label: '负责部门', type: 'text', defaultValue: '制造信息化部门' },
    'mes.depSystem': { label: '依赖系统', type: 'text', defaultValue: '' },
    'mes.depType': { label: '依赖类型', type: 'select', defaultValue: '上游', options: ['上游', '下游', '双向'] },
    'mes.depDirection': { label: '数据方向', type: 'text', defaultValue: '' },
    'planningRule.name': { label: '规则名称', type: 'text', defaultValue: '' },
    'planningRule.scene': { label: '适用场景', type: 'text', defaultValue: '' },
    'planningRule.condition': { label: '触发条件', type: 'textarea', defaultValue: '' },
    'planningRule.action': { label: '推荐动作', type: 'textarea', defaultValue: '' },
    'mes.deploy': { label: '部署方式', type: 'textarea', defaultValue: 'MES 与数据库、接口服务分层部署。' },
    'mes.interface': { label: '接口组织', type: 'textarea', defaultValue: '统一经过应用服务层组织接口访问。' },
    'mes.security': { label: '安全关注点', type: 'textarea', defaultValue: '严格控制 MES 到控制系统的访问路径。' },
  },
  outputs: {
    'mes-summary-basic': ['mes.scope', 'mes.goal', 'mes.owner', 'mes.deploy'],
    'mes-summary-dependencies': { recordPage: 'mes-dependencies', fields: ['mes.depSystem', 'mes.depType', 'mes.depDirection'] },
    'mes-summary-rules': { recordPage: 'mes-rules', fields: ['planningRule.name', 'planningRule.scene', 'planningRule.action'] },
  },
  cases: [
    {
      key: 'mes-case-1',
      title: '案例：离散制造 MES 集成规划',
      description: '聚焦 MES 与 ERP、WMS、产线系统的接口依赖与部署边界。',
      formData: {
        'mes.scope': '生产执行、追溯、报工与工艺下发',
        'mes.goal': '实现计划到执行闭环',
        'mes.owner': '制造信息化部',
        'mes.deploy': 'MES 应用、接口与数据库分层部署。',
        'mes.interface': '统一经应用服务层对接 ERP、WMS 与设备采集系统。',
        'mes.security': 'MES 到控制网访问需经明确边界。',
      },
      recordCollections: {
        'special-judgements': [
          { 'iteration.name': '项目特例判断', 'iteration.sourcePage': '设计推演', 'iteration.reason': '存在超出既有规则的现场约束', 'iteration.action': '采用项目特例方案并单独记录', 'iteration.reuse': '可在同类项目中复用，但需增加适用边界说明' },
        ],
        'experience-candidates': [
          { 'candidate.name': '新增经验候选', 'candidate.target': '判断依据', 'candidate.condition': '同类场景重复出现', 'candidate.suggestion': '整理为正式规则并补充触发条件', 'candidate.status': '待评审' },
        ],
        'mes-dependencies': [
          { 'mes.depSystem': 'ERP', 'mes.depType': '上游', 'mes.depDirection': '工单下发 / 回传产量' },
          { 'mes.depSystem': 'WMS', 'mes.depType': '双向', 'mes.depDirection': '物料领退 / 库存回写' },
        ],
        'mes-rules': [
          { 'planningRule.name': '接口统一收敛', 'planningRule.scene': '系统依赖较多', 'planningRule.condition': 'MES 需对接多个上游下游系统', 'planningRule.action': '统一通过接口服务层组织访问与认证' },
        ],
      },
    },
  ],
};
