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
      label: '🔬 Halcyon — eBPF Monitor',
      link: { type: 'doc', id: 'projects/halycon-ebpf/index' },
      items: [
        'projects/halycon-ebpf/architecture',
        'projects/halycon-ebpf/ebpf-program',
        'projects/halycon-ebpf/userspace',
        'projects/halycon-ebpf/performance',
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
  ],
}

export default sidebars
