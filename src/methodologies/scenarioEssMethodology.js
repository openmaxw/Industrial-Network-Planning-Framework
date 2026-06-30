export const scenarioEssMethodology = {
  meta: {
    key: 'scenario-ess',
    title: '储能项目经验框架',
    subtitle: '面向储能电站场景的网络规划与边界梳理',
    version: '0.1.0',
    description: '用于沉淀储能项目在站控层、集控层、远程运维与安全边界上的规划经验。',
  },
  systemPages: {
    home: {
      title: '首页',
      type: 'home',
      description: '用于展示系统简介、经验信息、案例入口和导入导出能力。',
    },
  },
  navigation: [
    { key: 'how-to-ask', title: '资料采集', children: [{ key: 'ess-profile', title: '项目概况' }, { key: 'ess-assets', title: '关键对象' }] },
    { key: 'how-to-judge', title: '判断依据', children: [{ key: 'ess-rules', title: '场景规则' }] },
    { key: 'how-to-derive', title: '设计推演', children: [{ key: 'ess-design', title: '网络组织' }] },
    { key: 'how-to-land', title: '结果落地', children: [{ key: 'ess-summary', title: '规划摘要' }] },
  ],
  pages: {
    'ess-profile': {
      title: '项目概况',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于定义储能项目的规模、边界与建设目标。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '项目概况记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['ess.site', 'ess.scale', 'ess.mode'],
      fields: ['ess.site', 'ess.scale', 'ess.mode'],
    },
    'ess-assets': {
      title: '关键对象',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于定义储能系统中的关键对象与区域归属。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '关键对象记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['ess.assetName', 'ess.assetType', 'ess.assetZone'],
      fields: ['ess.assetName', 'ess.assetType', 'ess.assetZone'],
    },
    'ess-rules': {
      title: '场景规则',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于沉淀储能项目中的典型规划规则。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '场景规则记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['planningRule.condition', 'planningRule.action', 'planningRule.scene'],
      fields: ['planningRule.condition', 'planningRule.action', 'planningRule.scene', 'planningRule.name'],
    },
    'ess-design': {
      title: '网络组织',
      type: 'record-collection',
      layout: 'table-form',
      description: '用于整理储能项目的网络组织与边界做法。',
      sections: [
        { key: 'record-list', kind: 'record-list', title: '网络组织记录表' },
        { key: 'record-editor', kind: 'record-editor', title: '当前记录编辑区' },
      ],
      summaryColumns: ['ess.topology', 'ess.remote', 'ess.boundary'],
      fields: ['ess.topology', 'ess.remote', 'ess.boundary', 'derive.iterationFlag', 'derive.iterationNote', 'derive.candidateSuggestion'],
    },
    'ess-summary': {
      title: '规划摘要',
      type: 'output',
      layout: 'summary-output',
      description: '汇总储能项目的关键输入、规则和设计结果。',
      sections: [
        { key: 'ess-summary-basic', kind: 'key-value-summary', title: '项目摘要' },
        { key: 'ess-summary-assets', kind: 'record-summary', title: '关键对象' },
        { key: 'ess-summary-rules', kind: 'record-summary', title: '规则摘要' },
      ],
    },
    'special-judgements': {
      title: '特殊判断',
      type: 'record-collection',
      layout: 'table-form',
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
      layout: 'table-form',
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
    'ess.site': { label: '站点名称', type: 'text', defaultValue: '某储能电站' },
    'ess.scale': { label: '项目规模', type: 'text', defaultValue: '100MW/200MWh' },
    'ess.mode': { label: '建设模式', type: 'select', defaultValue: '新建', options: ['新建', '改造', '扩容'] },
    'ess.assetName': { label: '对象名称', type: 'text', defaultValue: '' },
    'ess.assetType': { label: '对象类型', type: 'select', defaultValue: 'PCS', options: ['PCS', 'BMS', 'EMS', '站控主机', '安防系统', '视频系统'] },
    'ess.assetZone': { label: '所在区域', type: 'select', defaultValue: '', options: ['站控区', '控制区', '集控区', '远程运维区', '视频安防区'] },
    'planningRule.name': { label: '规则名称', type: 'text', defaultValue: '' },
    'planningRule.scene': { label: '适用场景', type: 'text', defaultValue: '' },
    'planningRule.condition': { label: '触发条件', type: 'textarea', defaultValue: '' },
    'planningRule.action': { label: '推荐动作', type: 'textarea', defaultValue: '' },
    'ess.topology': { label: '网络组织方式', type: 'textarea', defaultValue: '站控层、集控层、远程接入面分层组织。' },
    'ess.remote': { label: '远程接入方式', type: 'textarea', defaultValue: '统一经 DMZ 或远程运维区接入。' },
    'ess.boundary': { label: '关键边界', type: 'textarea', defaultValue: '电站控制区与远程接入区边界明确隔离。' },
  },
  outputs: {
    'ess-summary-basic': ['ess.site', 'ess.scale', 'ess.mode', 'ess.topology'],
    'ess-summary-assets': { recordPage: 'ess-assets', fields: ['ess.assetName', 'ess.assetType', 'ess.assetZone'] },
    'ess-summary-rules': { recordPage: 'ess-rules', fields: ['planningRule.name', 'planningRule.scene', 'planningRule.action'] },
  },
  cases: [
    {
      key: 'ess-case-1',
      title: '案例：集中式储能站网络规划',
      description: '聚焦站控层分区、远程运维入口与对象归属梳理。',
      formData: {
        'ess.site': '华东某储能电站',
        'ess.scale': '200MW/400MWh',
        'ess.mode': '新建',
        'ess.topology': '站控层与远程运维层分区部署，关键控制对象独立接入。',
        'ess.remote': '远程接入统一经 DMZ 与运维平台。',
        'ess.boundary': 'EMS、视频、安防与控制系统边界明确。',
      },
      recordCollections: {
        'ess-profile': [
          { 'ess.site': '华东某储能电站', 'ess.scale': '200MW/400MWh', 'ess.mode': '新建' },
        ],
        'special-judgements': [
          { 'iteration.name': '项目特例判断', 'iteration.sourcePage': '设计推演', 'iteration.reason': '存在超出既有规则的现场约束', 'iteration.action': '采用项目特例方案并单独记录', 'iteration.reuse': '可在同类项目中复用，但需增加适用边界说明' },
        ],
        'experience-candidates': [
          { 'candidate.name': '新增经验候选', 'candidate.target': '判断依据', 'candidate.condition': '同类场景重复出现', 'candidate.suggestion': '整理为正式规则并补充触发条件', 'candidate.status': '待评审' },
        ],
        'ess-assets': [
          { 'ess.assetName': 'EMS 主机', 'ess.assetType': 'EMS', 'ess.assetZone': '站控区' },
          { 'ess.assetName': 'PCS 汇控柜', 'ess.assetType': 'PCS', 'ess.assetZone': '控制区' },
        ],
        'ess-rules': [
          { 'planningRule.name': '远程入口统一收敛', 'planningRule.scene': '存在远程运维', 'planningRule.condition': '第三方需远程维护站内系统', 'planningRule.action': '统一通过 DMZ 或运维区收敛接入' },
        ],
        'ess-design': [
          {
            'ess.topology': '站控层与远程运维层分区部署，关键控制对象独立接入。',
            'ess.remote': '远程接入统一经 DMZ 与运维平台。',
            'ess.boundary': 'EMS、视频、安防与控制系统边界明确。',
            'derive.iterationFlag': '是',
            'derive.iterationNote': '储能项目应优先明确站控层与远程运维边界。',
            'derive.candidateSuggestion': '补充储能项目边界治理经验。',
          },
        ],
      },
    },
  ],
};
