export const demoMethodology = {
  meta: {
    key: 'industrial-network-demo',
    title: '工业网络规划系统',
    subtitle: '方法论驱动的内容配置框架',
    version: '0.1.0',
    description: '用于验证菜单、标准页、记录页和字段依赖的示例方法论。',
  },
  systemPages: {
    home: {
      title: '首页',
      type: 'home',
      description: '用于展示系统简介、方法论信息、案例入口和导入导出能力。',
    },
  },
  navigation: [
    {
      key: 'raw-information',
      title: '原始信息',
      children: [
        { key: 'project-basic', title: '项目基础' },
        { key: 'business-description', title: '业务描述' },
        { key: 'field-input', title: '现场输入' },
      ],
    },
    {
      key: 'design-derivation',
      title: '设计推导',
      children: [
        { key: 'zone-planning', title: '区域划分' },
        {
          key: 'security-analysis',
          title: '安全分析',
          children: [
            { key: 'threat-identification', title: '威胁识别' },
            { key: 'risk-assessment', title: '风险评估' },
          ],
        },
      ],
    },
    {
      key: 'deliverables',
      title: '成果输出',
      children: [
        { key: 'design-result', title: '设计结果' },
        { key: 'delivery-list', title: '交付清单' },
      ],
    },
  ],
  pages: {
    'project-basic': {
      title: '项目基础',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于记录项目名称、客户信息和基础背景。',
      fields: ['project.name', 'project.customer', 'project.industry'],
    },
    'field-input': {
      title: '现场输入',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于整理现场采集到的网络、资产和约束输入。',
      fields: ['input.site', 'input.assets', 'input.constraints'],
    },
    'business-description': {
      title: '业务描述',
      type: 'record-collection',
      layout: 'list-form',
      description: '用于采集多条业务记录，每条记录包含业务名称和所属区域。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '已采集记录' },
        { key: 'record-editor', kind: 'record-editor', title: '录入区' },
      ],
      fields: ['business.name', 'business.zone'],
    },
    'zone-planning': {
      title: '区域划分',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于定义区域边界、对象归属和基础隔离策略。',
      fields: ['zone.scope', 'zone.businessZone', 'zone.relatedAsset', 'zone.strategy', 'zone.boundary', 'zone.isolationNotes'],
    },
    'security-analysis': {
      title: '安全分析',
      type: 'group',
      description: '用于承载威胁识别和风险评估等分析子页面。',
    },
    'threat-identification': {
      title: '威胁识别',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于梳理潜在威胁来源、攻击面和关键影响对象。',
      fields: ['threat.source', 'threat.surface', 'threat.asset'],
    },
    'risk-assessment': {
      title: '风险评估',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于评估风险等级、影响程度和优先处理顺序。',
      fields: ['risk.level', 'risk.impact', 'risk.priority'],
    },
    'design-result': {
      title: '设计结果',
      type: 'output',
      layout: 'summary-output',
      description: '用于集中展示设计输出和最终结果摘要。',
      sections: [
        { key: 'project-summary', kind: 'key-value-summary', title: '项目摘要' },
        { key: 'business-summary', kind: 'record-summary', title: '业务记录摘要' },
        { key: 'zone-summary', kind: 'key-value-summary', title: '区域规划摘要' },
      ],
    },
    'delivery-list': {
      title: '交付清单',
      type: 'output',
      layout: 'summary-output',
      description: '用于整理交付物组成和导出清单。',
      sections: [
        { key: 'delivery-summary', kind: 'key-value-summary', title: '交付内容摘要' },
      ],
    },
  },
  fields: {
    'project.name': {
      label: '项目名称',
      type: 'text',
      defaultValue: '工业网络规划项目',
    },
    'project.customer': {
      label: '客户名称',
      type: 'text',
      defaultValue: '某工业客户',
    },
    'project.industry': {
      label: '所属行业',
      type: 'select',
      defaultValue: '离散制造',
      options: ['离散制造', '流程工业', '能源电力'],
    },
    'input.site': {
      label: '现场位置',
      type: 'text',
      defaultValue: '华东区域工厂',
    },
    'input.assets': {
      label: '关键资产',
      type: 'textarea',
      defaultValue: 'PLC\nHMI\n工程师站\n交换机',
    },
    'input.constraints': {
      label: '主要约束',
      type: 'textarea',
      defaultValue: '不停产改造、老旧设备兼容、预算分期',
    },
    'zone.scope': {
      label: '规划范围',
      type: 'text',
      defaultValue: '控制网与工业 DMZ',
    },
    'zone.boundary': {
      label: '区域边界',
      type: 'textarea',
      defaultValue: '按产线、控制域和远程接入边界划分',
    },
    'zone.strategy': {
      label: '隔离策略',
      type: 'select',
      defaultValue: '分区分域',
      options: ['分区分域', '单网扁平优化', '核心隔离'],
    },
    'zone.relatedAsset': {
      label: '关联资产',
      type: 'select',
      defaultValue: 'PLC',
      optionsSource: {
        type: 'lines-from-field',
        field: 'input.assets',
      },
    },
    'business.name': {
      label: '业务名称',
      type: 'text',
      defaultValue: '',
    },
    'business.zone': {
      label: '所属区域',
      type: 'text',
      defaultValue: '',
    },
    'zone.businessZone': {
      label: '引用业务区域',
      type: 'select',
      defaultValue: '',
      optionsSource: {
        type: 'record-field',
        recordPage: 'business-description',
        field: 'business.zone',
        dedupe: true,
      },
    },
    'zone.isolationNotes': {
      label: '隔离补充说明',
      type: 'textarea',
      defaultValue: '当采用核心隔离时，需要补充边界访问控制与例外说明。',
      visibleWhen: {
        field: 'zone.strategy',
        equals: '核心隔离',
      },
    },
    'threat.source': {
      label: '威胁来源',
      type: 'textarea',
      defaultValue: '远程维护、供应链引入、内部误操作',
    },
    'threat.surface': {
      label: '攻击面',
      type: 'textarea',
      defaultValue: 'VPN 接入、工程师站、边界交换节点',
    },
    'threat.asset': {
      label: '关键影响对象',
      type: 'text',
      defaultValue: '控制器与关键生产单元',
    },
    'risk.level': {
      label: '风险等级',
      type: 'select',
      defaultValue: '中',
      options: ['低', '中', '高'],
    },
    'risk.impact': {
      label: '影响描述',
      type: 'textarea',
      defaultValue: '可能导致产线停机与远程运维中断',
    },
    'risk.priority': {
      label: '处置优先级',
      type: 'select',
      defaultValue: 'P1',
      options: ['P1', 'P2', 'P3'],
    },
  },
  outputs: {
    'design-result': {
      'project-summary': ['project.name', 'project.customer', 'project.industry'],
      'business-summary': {
        recordPage: 'business-description',
        fields: ['business.name', 'business.zone'],
      },
      'zone-summary': ['zone.scope', 'zone.businessZone', 'zone.relatedAsset', 'zone.strategy'],
    },
    'delivery-list': {
      'delivery-summary': ['project.name', 'zone.strategy', 'risk.priority'],
    },
  },
};
