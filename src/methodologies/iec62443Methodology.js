export const iec62443Methodology = {
  meta: {
    key: 'iec62443',
    title: 'IEC62443 经验框架',
    subtitle: '工业控制系统安全设计与防护建模',
    version: '0.1.0',
    description: '用于验证以安全区域、通道、威胁和风险为核心的 IEC62443 经验骨架。',
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
      key: 'security-foundation',
      title: '安全基础',
      children: [
        { key: 'security-scope', title: '范围定义' },
        { key: 'zone-definition', title: '区域划分' },
      ],
    },
    {
      key: 'security-analysis',
      title: '安全分析',
      children: [
        { key: 'conduit-definition', title: '通道定义' },
        { key: 'threat-analysis', title: '威胁分析' },
        { key: 'risk-evaluation', title: '风险评估' },
      ],
    },
    {
      key: 'security-output',
      title: '结果落地',
      children: [{ key: 'iec62443-summary', title: '安全摘要' }],
    },
  ],
  pages: {
    'security-scope': {
      title: '范围定义',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于定义安全分析对象与边界。',
      fields: ['security.target', 'security.boundary', 'security.levelTarget'],
    },
    'zone-definition': {
      title: '区域划分',
      type: 'record-collection',
      layout: 'list-form',
      description: '用于定义安全区域及其属性。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '已定义区域' },
        { key: 'record-editor', kind: 'record-editor', title: '录入区' },
      ],
      fields: ['zone.name', 'zone.type'],
    },
    'conduit-definition': {
      title: '通道定义',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于描述区域间通道与访问路径。',
      fields: ['conduit.name', 'conduit.sourceZone', 'conduit.targetZone'],
    },
    'threat-analysis': {
      title: '威胁分析',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于分析威胁来源与攻击面。',
      fields: ['threat.source', 'threat.surface', 'threat.targetZone'],
    },
    'risk-evaluation': {
      title: '风险评估',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于评估风险等级与优先级。',
      fields: ['risk.level', 'risk.priority', 'risk.note'],
    },
    'iec62443-summary': {
      title: '安全摘要',
      type: 'output',
      layout: 'summary-output',
      description: '汇总安全区域、威胁与风险结果。',
      sections: [
        { key: 'scope-summary', kind: 'key-value-summary', title: '范围摘要' },
        { key: 'zone-summary', kind: 'record-summary', title: '区域摘要' },
      ],
    },
  },
  fields: {
    'security.target': { label: '分析对象', type: 'text', defaultValue: '工业控制系统' },
    'security.boundary': { label: '安全边界', type: 'text', defaultValue: '控制区到 DMZ' },
    'security.levelTarget': { label: '目标安全等级', type: 'select', defaultValue: 'SL2', options: ['SL1', 'SL2', 'SL3'] },
    'zone.name': { label: '区域名称', type: 'text', defaultValue: '' },
    'zone.type': { label: '区域类型', type: 'text', defaultValue: '' },
    'conduit.name': { label: '通道名称', type: 'text', defaultValue: '远程维护通道' },
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
    'threat.source': { label: '威胁来源', type: 'text', defaultValue: '远程接入' },
    'threat.surface': { label: '攻击面', type: 'text', defaultValue: '维护入口与工程师站' },
    'threat.targetZone': {
      label: '影响区域',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'zone-definition', field: 'zone.name', dedupe: true },
    },
    'risk.level': { label: '风险等级', type: 'select', defaultValue: '中', options: ['低', '中', '高'] },
    'risk.priority': { label: '优先级', type: 'select', defaultValue: 'P2', options: ['P1', 'P2', 'P3'] },
    'risk.note': { label: '补充说明', type: 'textarea', defaultValue: '需结合通道控制策略进一步细化。' },
  },
  outputs: {
    'iec62443-summary': {
      'scope-summary': ['security.target', 'security.boundary', 'security.levelTarget'],
      'zone-summary': { recordPage: 'zone-definition', fields: ['zone.name', 'zone.type'] },
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
        'conduit.name': '供应商远程维护通道',
        'conduit.sourceZone': 'DMZ',
        'conduit.targetZone': '控制区',
        'threat.source': '第三方远程维护',
        'threat.surface': 'VPN 与跳板机',
        'threat.targetZone': '控制区',
        'risk.level': '高',
        'risk.priority': 'P1',
        'risk.note': '需强化访问审批、白名单与审计。',
      },
      recordCollections: {
        'zone-definition': [
          { 'zone.name': 'DMZ', 'zone.type': '隔离区' },
          { 'zone.name': '控制区', 'zone.type': '关键控制区' },
        ],
      },
    },
  ],
};
