export const isa95Methodology = {
  meta: {
    key: 'isa95',
    title: 'ISA95 方法论框架',
    subtitle: '工业企业层级与业务协同建模',
    version: '0.1.0',
    description: '用于验证以业务、层级、对象关系为核心的 ISA95 方法论骨架。',
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
      key: 'enterprise-model',
      title: '企业建模',
      children: [
        { key: 'enterprise-basic', title: '企业信息' },
        { key: 'site-structure', title: '站点结构' },
      ],
    },
    {
      key: 'operation-model',
      title: '运营建模',
      children: [
        { key: 'business-process', title: '业务流程' },
        { key: 'asset-allocation', title: '对象分配' },
      ],
    },
    {
      key: 'results',
      title: '成果输出',
      children: [{ key: 'isa95-summary', title: '建模摘要' }],
    },
  ],
  pages: {
    'enterprise-basic': {
      title: '企业信息',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于定义企业、工厂与组织层级背景。',
      fields: ['enterprise.name', 'enterprise.scope', 'enterprise.level'],
    },
    'site-structure': {
      title: '站点结构',
      type: 'record-collection',
      layout: 'list-form',
      description: '用于定义企业、区域、产线等层级结构。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '已采集结构' },
        { key: 'record-editor', kind: 'record-editor', title: '录入区' },
      ],
      fields: ['site.nodeName', 'site.nodeType'],
    },
    'business-process': {
      title: '业务流程',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于描述业务活动、生产流程与协同关系。',
      fields: ['process.name', 'process.owner', 'process.zoneRef'],
    },
    'asset-allocation': {
      title: '对象分配',
      type: 'standard-record',
      layout: 'single-form',
      description: '用于描述对象与层级节点的对应关系。',
      fields: ['asset.name', 'asset.siteRef', 'asset.role'],
    },
    'isa95-summary': {
      title: '建模摘要',
      type: 'output',
      layout: 'summary-output',
      description: '汇总企业建模与业务对象分配结果。',
      sections: [
        { key: 'enterprise-summary', kind: 'key-value-summary', title: '企业摘要' },
        { key: 'site-summary', kind: 'record-summary', title: '站点结构摘要' },
      ],
    },
  },
  fields: {
    'enterprise.name': { label: '企业名称', type: 'text', defaultValue: '示例制造集团' },
    'enterprise.scope': { label: '建模范围', type: 'text', defaultValue: '总部到产线' },
    'enterprise.level': { label: '层级重点', type: 'select', defaultValue: 'L3-L4', options: ['L0-L1', 'L2-L3', 'L3-L4'] },
    'site.nodeName': { label: '节点名称', type: 'text', defaultValue: '' },
    'site.nodeType': { label: '节点类型', type: 'text', defaultValue: '' },
    'process.name': { label: '流程名称', type: 'text', defaultValue: '生产执行流程' },
    'process.owner': { label: '流程归属', type: 'text', defaultValue: '制造部门' },
    'process.zoneRef': {
      label: '关联层级节点',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'site-structure', field: 'site.nodeName', dedupe: true },
    },
    'asset.name': { label: '对象名称', type: 'text', defaultValue: 'MES 接口服务' },
    'asset.siteRef': {
      label: '所属节点',
      type: 'select',
      defaultValue: '',
      optionsSource: { type: 'record-field', recordPage: 'site-structure', field: 'site.nodeName', dedupe: true },
    },
    'asset.role': { label: '对象角色', type: 'text', defaultValue: '业务协调对象' },
  },
  outputs: {
    'isa95-summary': {
      'enterprise-summary': ['enterprise.name', 'enterprise.scope', 'enterprise.level'],
      'site-summary': { recordPage: 'site-structure', fields: ['site.nodeName', 'site.nodeType'] },
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
        'process.name': '订单到生产执行',
        'process.owner': '制造与计划部门',
        'process.zoneRef': '总装工厂',
        'asset.name': 'MES 服务',
        'asset.siteRef': '总装工厂',
        'asset.role': '生产协同对象',
      },
      recordCollections: {
        'site-structure': [
          { 'site.nodeName': '总装工厂', 'site.nodeType': '工厂' },
          { 'site.nodeName': '焊装产线', 'site.nodeType': '产线' },
        ],
      },
    },
  ],
};
