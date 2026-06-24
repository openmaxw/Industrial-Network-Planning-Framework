import { demoMethodology } from './demoMethodology.js';
import { iec62443Methodology } from './iec62443Methodology.js';
import { isa95Methodology } from './isa95Methodology.js';

export const methodologyCatalog = [
  {
    key: 'isa95',
    title: 'ISA95',
    description: '偏重企业层级、业务流程与对象分配。',
    methodology: isa95Methodology,
  },
  {
    key: 'iec62443',
    title: 'IEC62443',
    description: '偏重安全区域、通道、威胁与风险。',
    methodology: iec62443Methodology,
  },
  {
    key: 'isa95-iec62443',
    title: 'ISA95 + IEC62443',
    description: '偏重业务结构与安全规划结合的综合方法论。',
    methodology: demoMethodology,
  },
];
