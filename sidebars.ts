import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docs: [
    'projects/index',
    {
      type: 'category',
      label: '🎮 VIVIA: Beyond the Known',
      link: { type: 'doc', id: 'projects/vivia/index' },
      items: [
        'projects/vivia/architecture',
        'projects/vivia/ai-engine',
        'projects/vivia/rendering',
        'projects/vivia/multiplayer',
        'projects/vivia/gameplay',
        'projects/vivia/performance',
      ],
    },
    {
      type: 'category',
      label: '🔬 Talus — eBPF Endpoint Security',
      link: { type: 'doc', id: 'projects/talus-process-monitor/index' },
      items: [
        'projects/talus-process-monitor/architecture',
        'projects/talus-process-monitor/ebpf-program',
        'projects/talus-process-monitor/userspace',
        'projects/talus-process-monitor/performance',
      ],
    },
    {
      type: 'category',
      label: '🛡️ AEGIS',
      link: { type: 'doc', id: 'projects/linux-aegis/index' },
      items: [
        'projects/linux-aegis/index',
      ],
    },
    {
      type: 'category',
      label: '📜 Externum Language',
      link: { type: 'doc', id: 'projects/externum/index' },
      items: [
        'projects/externum/syntax',
        'projects/externum/compiler',
        'projects/externum/architecture',
        'projects/externum/stdlib',
        'projects/externum/playground',
      ],
    },
    {
      type: 'category',
      label: '🔒 CyberForge',
      link: { type: 'doc', id: 'projects/cyberforge/index' },
      items: [
        'projects/cyberforge/index',
      ],
    },
    {
      type: 'category',
      label: '🛡️ QuantumShield',
      link: { type: 'doc', id: 'projects/quantumshield/index' },
      items: [
        'projects/quantumshield/index',
      ],
    },
    {
      type: 'category',
      label: '🔐 Fortis',
      link: { type: 'doc', id: 'projects/fortis/index' },
      items: [
        'projects/fortis/index',
      ],
    },
  ],
}

export default sidebars
