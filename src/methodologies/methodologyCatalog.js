import { demoMethodology } from './demoMethodology.js';
import { iec62443Methodology } from './iec62443Methodology.js';
import { isa95Methodology } from './isa95Methodology.js';
import { scenarioEssMethodology } from './scenarioEssMethodology.js';
import { systemMesMethodology } from './systemMesMethodology.js';

export const methodologyCatalog = [
  {
    key: 'isa95',
    title: 'ISA95',
    description: '偏重企业层级、业务流程与对象分配。',
    tags: ['标准理论角度', '企业层级', '业务流程'],
    audience: ['FAE', '方案工程师'],
    status: '可用',
    methodology: isa95Methodology,
  },
  {
    key: 'iec62443',
    title: 'IEC62443',
    description: '偏重安全区域、通道、威胁与风险。',
    tags: ['标准理论角度', '工业安全', '分区分域'],
    audience: ['FAE', '安全工程师'],
    status: '可用',
    methodology: iec62443Methodology,
  },
  {
    key: 'isa95-iec62443',
    title: 'ISA95 + IEC62443',
    description: '偏重业务结构与安全规划结合的综合经验体。',
    tags: ['标准理论角度', '综合规划', '标杆经验'],
    audience: ['FAE', '方案工程师', '架构设计人员'],
    status: '可用',
    methodology: demoMethodology,
  },
  {
    key: 'scenario-ess',
    title: '储能项目',
    description: '偏重储能电站中的站控分区、远程运维与对象归属。',
    tags: ['应用场景角度', '储能', '站控网络'],
    audience: ['FAE', '方案工程师'],
    status: '可用',
    methodology: scenarioEssMethodology,
  },
  {
    key: 'system-mes',
    title: 'MES',
    description: '偏重 MES 系统依赖、接口组织与部署边界。',
    tags: ['系统对象角度', 'MES', '系统集成'],
    audience: ['FAE', '架构设计人员'],
    status: '可用',
    methodology: systemMesMethodology,
  },
];
