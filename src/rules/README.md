# 规则库目录说明

本目录存放系统默认规则库数据。

## 当前原则
- 每个规则主题一个文件
- 文件只保存规则数组，不混入页面结构
- 案例数据不再内嵌规则库
- 运行时默认规则由 `src/store/usePlanningStore.js` 引用本目录提供

## 当前主题
- 拓扑规则：`demoTopologyRules.js`
- 分层规则：`demoLayerRules.js`
- 区域规则：`demoZoneRules.js`
- 通道规则：`demoConduitRules.js`
- 边界互联规则：`demoBoundaryRules.js`
- 技术选择规则：`demoTechnologyRules.js`
- 地址规划规则：`demoAddressRules.js`
- 性能规则：`demoPerformanceRules.js`
- 稳定性规则：`demoStabilityRules.js`
- 冗余规则：`demoRedundancyRules.js`
- 接入规则：`demoAccessRules.js`
- 选型规则：`demoSelectionRules.js`
- 部署规则：`demoDeploymentRules.js`
- 安全规则：`demoSecurityRules.js`
- 场景规则：`demoScenarioRules.js`

## 后续建议
- 新方法体如需复用同一规则库，可直接引用本目录
- 如需建立独立规则库，可按相同方式新增文件并在 store 中挂接
