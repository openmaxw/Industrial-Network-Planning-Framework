export const iec62443Methodology = {
  meta: {
    key: 'iec62443',
    title: 'IEC62443 经验框架',
    subtitle: '工业控制系统安全设计与防护建模',
    version: '0.2.0',
    description: '用于沉淀以安全区域、通道、威胁、风险与防护措施为核心的 IEC62443 规划经验。',
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
        { key: 'security-scope', title: '范围定义' },
        { key: 'zone-definition', title: '区域划分' },
        { key: 'conduit-definition', title: '通道定义' },
        { key: 'threat-analysis', title: '威胁分析' },
        { key: 'risk-evaluation', title: '风险评估' },
      ],
    },
    {
      key: 'how-to-judge',
      title: '判断依据',
      children: [{ key: 'security-rules', title: '安全规则' }],
    },
    {
      key: 'how-to-derive',
      title: '设计推演',
      children: [{ key: 'security-design', title: '防护设计' }],
    },
    {
      key: 'how-to-land',
      title: '结果落地',
      children: [
        { key: 'iec62443-summary', title: '安全摘要' },
        { key: 'iec62443-review', title: '规划复盘' },
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
    'security-scope': {
      title: '范围定义',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于定义安全分析对象与边界。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '范围定义记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['security.target', 'security.boundary', 'security.levelTarget', 'security.goal'],
      fields: ['security.target', 'security.boundary', 'security.levelTarget', 'security.goal'],
    },
    'zone-definition': {
      title: '区域划分',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于定义安全区域及其属性。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '区域划分记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['zone.name', 'zone.type', 'zone.level'],
      fields: ['zone.name', 'zone.type', 'zone.level', 'zone.object'],
    },
    'conduit-definition': {
      title: '通道定义',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于描述区域间通道与访问路径。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '通道定义记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['conduit.name', 'conduit.sourceZone', 'conduit.targetZone'],
      fields: ['conduit.name', 'conduit.sourceZone', 'conduit.targetZone', 'conduit.protection'],
    },
    'threat-analysis': {
      title: '威胁分析',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于分析威胁来源与攻击面。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '威胁分析记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['threat.source', 'threat.surface', 'threat.targetZone'],
      fields: ['threat.source', 'threat.surface', 'threat.targetZone', 'threat.impact'],
    },
    'risk-evaluation': {
      title: '风险评估',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于评估风险等级与优先级。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '风险评估记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['risk.level', 'risk.priority', 'risk.target'],
      fields: ['risk.level', 'risk.priority', 'risk.target', 'risk.note'],
    },
    'security-rules': {
      title: '安全规则',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于沉淀 IEC62443 场景下的分区分域与防护规则。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '安全规则记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['planningRule.condition', 'planningRule.action', 'planningRule.scene'],
      fields: ['planningRule.condition', 'planningRule.action', 'planningRule.scene', 'planningRule.name'],
    },
    'security-design': {
      title: '防护设计',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于整理安全防护的设计原则、边界与措施。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '防护设计记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['security.designPrinciple', 'security.remoteControl', 'security.measure'],
      fields: ['security.designPrinciple', 'security.remoteControl', 'security.measure', 'derive.iterationFlag', 'derive.iterationNote', 'derive.candidateSuggestion'],
    },
    'iec62443-summary': {
      title: '安全摘要',
      type: 'output',
      layout: 'summary-output',
      description: '汇总安全范围、区域、通道、威胁与风险评估结果。',
      sections: [
        { key: 'scope-summary', kind: 'key-value-summary', title: '范围摘要' },
        { key: 'zone-summary', kind: 'record-summary', title: '区域摘要' },
        { key: 'conduit-summary', kind: 'record-summary', title: '通道摘要' },
        { key: 'risk-summary', kind: 'record-summary', title: '风险摘要' },
      ],
    },
    'iec62443-review': {
      title: '规划复盘',
      type: 'output',
      layout: 'summary-output',
      description: '用于从内部角度复盘 IEC62443 项目中的区域划分、安全判断与防护设计逻辑。',
      sections: [
        { key: 'iec-review-positioning', kind: 'text-summary', title: '1. 安全定位' },
        { key: 'iec-review-rules', kind: 'text-summary', title: '2. 关键规则' },
        { key: 'iec-review-derivation', kind: 'text-summary', title: '3. 推演过程' },
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
    'security.target': { label: '分析对象', type: 'text', defaultValue: '控制系统远程维护体系' },
    'security.boundary': { label: '分析边界', type: 'text', defaultValue: '维护入口至控制区' },
    'security.levelTarget': { label: '目标安全等级', type: 'select', defaultValue: 'SL2', options: ['SL1', 'SL2', 'SL3'] },
    'security.goal': { label: '安全目标', type: 'text', defaultValue: '收敛远程接入面并明确边界防护' },
    'zone.name': { label: '区域名称', type: 'text', defaultValue: '' },
    'zone.type': { label: '区域类型', type: 'text', defaultValue: '' },
    'zone.level': { label: '区域等级', type: 'select', defaultValue: 'SL2', options: ['SL1', 'SL2', 'SL3'] },
    'zone.object': { label: '关键对象', type: 'text', defaultValue: '' },
    'conduit.name': { label: '通道名称', type: 'text', defaultValue: '' },
    'conduit.sourceZone': {
      label: '源区域',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'zone-definition', field: 'zone.name', dedupe: true },
    },
    'conduit.targetZone': {
      label: '目标区域',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'zone-definition', field: 'zone.name', dedupe: true },
    },
    'conduit.protection': { label: '防护要求', type: 'text', defaultValue: '' },
    'threat.source': { label: '威胁来源', type: 'text', defaultValue: '' },
    'threat.surface': { label: '攻击面', type: 'text', defaultValue: '' },
    'threat.targetZone': {
      label: '目标区域',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'zone-definition', field: 'zone.name', dedupe: true },
    },
    'threat.impact': { label: '潜在影响', type: 'text', defaultValue: '' },
    'risk.level': { label: '风险等级', type: 'select', defaultValue: '高', options: ['高', '中', '低'] },
    'risk.priority': { label: '整改优先级', type: 'select', defaultValue: 'P1', options: ['P1', 'P2', 'P3'] },
    'risk.target': { label: '风险对象', type: 'text', defaultValue: '' },
    'risk.note': { label: '风险说明', type: 'textarea', defaultValue: '' },
    'planningRule.name': { label: '规则名称', type: 'text', defaultValue: '' },
    'planningRule.scene': { label: '适用场景', type: 'text', defaultValue: '' },
    'planningRule.condition': { label: '触发条件', type: 'textarea', defaultValue: '' },
    'planningRule.action': { label: '推荐动作', type: 'textarea', defaultValue: '' },
    'security.designPrinciple': { label: '设计原则', type: 'textarea', defaultValue: '按区域、通道、边界与访问控制关系组织安全设计。' },
    'security.remoteControl': { label: '远程接入控制', type: 'textarea', defaultValue: '所有远程接入统一收敛，经审批、认证和审计后访问。' },
    'security.measure': { label: '关键措施', type: 'textarea', defaultValue: '采用分区分域、最小权限、白名单和审计追踪等措施。' },
  },
  outputs: {
    'iec62443-summary': {
      'scope-summary': ['security.target', 'security.boundary', 'security.levelTarget', 'security.goal'],
      'zone-summary': { recordPage: 'zone-definition', fields: ['zone.name', 'zone.type', 'zone.level'] },
      'conduit-summary': { recordPage: 'conduit-definition', fields: ['conduit.name', 'conduit.sourceZone', 'conduit.targetZone'] },
      'risk-summary': { recordPage: 'risk-evaluation', fields: ['risk.level', 'risk.priority', 'risk.target'] },
    },
    'iec62443-review': {
      'iec-review-positioning': {
        lines: [
          { type: 'field-join', label: '安全基础', fields: ['security.target', 'security.boundary', 'security.levelTarget', 'security.goal'] },
        ],
      },
      'iec-review-rules': {
        bullets: [
          { type: 'record-join', label: '安全规则', recordPage: 'security-rules', fields: ['planningRule.name', 'planningRule.scene', 'planningRule.action'], separator: '；' },
        ],
      },
      'iec-review-derivation': {
        paragraphs: [
          { type: 'template', parts: [{ kind: 'text', value: '本项目先明确安全范围，再完成区域与通道定义，之后结合威胁与风险评估收敛防护设计。' }] },
          { type: 'field-join', label: '防护设计', fields: ['security.designPrinciple', 'security.remoteControl', 'security.measure', 'derive.iterationFlag', 'derive.iterationNote', 'derive.candidateSuggestion'] },
        ],
      },
    },
  },
  cases: [
    {
      key: 'iec62443-case-1',
      title: '案例：远程运维安全治理',
      description: '聚焦区域、通道与风险分析。',
      formData: {
        'security.target': '控制系统远程维护体系',
        'security.boundary': '维护入口至控制区',
        'security.levelTarget': 'SL2',
        'security.goal': '降低远程接入带来的安全暴露面',
        'security.designPrinciple': '按区域、通道和远程访问链路逐步收敛访问面。',
        'security.remoteControl': '统一经 DMZ 与堡垒机接入远程维护。',
        'security.measure': '执行白名单、双因素认证和日志审计。',
      },
      recordCollections: {
        'security-scope': [
          {
            'security.target': '控制系统远程维护体系',
            'security.boundary': '维护入口至控制区',
            'security.levelTarget': 'SL2',
            'security.goal': '降低远程接入带来的安全暴露面',
          },
        ],
        'special-judgements': [
          { 'iteration.name': '项目特例判断', 'iteration.sourcePage': '设计推演', 'iteration.reason': '存在超出既有规则的现场约束', 'iteration.action': '采用项目特例方案并单独记录', 'iteration.reuse': '可在同类项目中复用，但需增加适用边界说明' },
        ],
        'experience-candidates': [
          { 'candidate.name': '新增经验候选', 'candidate.target': '判断依据', 'candidate.condition': '同类场景重复出现', 'candidate.suggestion': '整理为正式规则并补充触发条件', 'candidate.status': '待评审' },
        ],
        'zone-definition': [
          { 'zone.name': 'DMZ', 'zone.type': '隔离区', 'zone.level': 'SL2', 'zone.object': '跳板机 / 代理服务' },
          { 'zone.name': '控制区', 'zone.type': '关键控制区', 'zone.level': 'SL2', 'zone.object': 'PLC / HMI / SCADA' },
        ],
        'conduit-definition': [
          { 'conduit.name': '供应商远程维护通道', 'conduit.sourceZone': 'DMZ', 'conduit.targetZone': '控制区', 'conduit.protection': '审批、认证、审计' },
        ],
        'threat-analysis': [
          { 'threat.source': '第三方远程维护', 'threat.surface': 'VPN 与跳板机', 'threat.targetZone': '控制区', 'threat.impact': '越权访问与恶意配置' },
        ],
        'risk-evaluation': [
          { 'risk.level': '高', 'risk.priority': 'P1', 'risk.target': '远程维护入口', 'risk.note': '需强化访问审批、白名单与审计。' },
        ],
        'security-rules': [
          { 'planningRule.name': '远程访问统一收敛', 'planningRule.scene': '存在供应商远程维护', 'planningRule.condition': '控制系统需要外部人员远程维护', 'planningRule.action': '统一经 DMZ、堡垒机与审计链路访问控制区' },
        ],
        'security-design': [
          {
            'security.designPrinciple': '按区域、通道和远程访问链路逐步收敛访问面。',
            'security.remoteControl': '统一经 DMZ 与堡垒机接入远程维护。',
            'security.measure': '执行白名单、双因素认证和日志审计。',
            'derive.iterationFlag': '是',
            'derive.iterationNote': '远程维护类项目应优先明确维护入口与边界审计链路。',
            'derive.candidateSuggestion': '补充远程运维安全治理经验模板。',
          },
        ],
      },
    },
  ],
};
