import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
  title: 'Bartosz Osiej',
  tagline:
    'Systems engineer — Rust game engine, eBPF kernel telemetry, custom programming languages. Building things that ship.',
  favicon: 'favicon.svg',
  url: 'https://bartoszosiej.github.io',
  baseUrl: '/Portfolio/',
  organizationName: 'BartoszOsiej',
  projectName: 'Portfolio',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap',
      },
    },
    { tagName: 'meta', attributes: { name: 'theme-color', content: '#0a0e1a' } },
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'og-image.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Bartosz Osiej',
      logo: { alt: 'Bartosz Osiej — Portfolio', src: 'logo.svg' },
      hideOnScroll: true,
      items: [
        { type: 'doc', docId: 'projects/index', position: 'left', label: 'Projects' },
        {
          type: 'dropdown', position: 'left', label: 'Deep Dives',
          items: [
            { type: 'doc', docId: 'projects/vivia/index', label: 'VIVIA' },
            { type: 'doc', docId: 'projects/halycon-ebpf/index', label: 'eBPF — Halcyon' },
            { type: 'doc', docId: 'projects/externum/index', label: 'Externum' },
          ],
        },
        { to: 'about', position: 'left', label: 'About' },
        { to: 'skills', position: 'left', label: 'Skills' },
        {
          href: 'https://github.com/BartoszOsiej',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
        {
          href: 'mailto:bartosz.osiej@proton.me',
          position: 'right',
          className: 'header-email-link',
          'aria-label': 'Email',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            { label: 'VIVIA: Beyond the Known', to: '/projects/vivia/' },
            { label: 'Halcyon — eBPF Monitor', to: '/projects/halycon-ebpf/' },
            { label: 'Externum Language', to: '/projects/externum/' },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'GitHub', href: 'https://github.com/BartoszOsiej' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/bartoszosiej' },
            { label: 'bartosz.osiej@proton.me', href: 'mailto:bartosz.osiej@proton.me' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'AURORA OS', href: 'https://github.com/BartoszOsiej/AURORA-OS' },
            { label: 'N2 Mesh (P2P)', href: 'https://github.com/BartoszOsiej/n2-mesh' },
            { label: 'Cybersec Toolkit', href: 'https://github.com/BartoszOsiej/cybersec-tools' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Bartosz Osiej · Built with Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['rust', 'python', 'toml', 'bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
