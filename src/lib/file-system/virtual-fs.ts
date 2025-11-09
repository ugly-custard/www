export interface VirtualFile {
  name: string
  type: 'file' | 'directory'
  content?: string
  children?: Record<string, VirtualFile>
}

export interface VirtualFileSystem {
  [key: string]: VirtualFile
}

export const fileSystem: VirtualFileSystem = {
  home: {
    name: 'home',
    type: 'directory',
    children: {
      'ugly': {
        name: 'ugly',
        type: 'directory',
        children: {
          about: {
            name: 'about',
            type: 'directory',
            children: {
              'personal.ts': {
                name: 'personal.ts',
                type: 'file',
                content: `export const personal = {
  name: "ugly",
  hostname: "custard",
  location: "Mumbai, India",
  interests: ["coding", "anime", "terminal UIs", "web development"],
  currentlyWatching: "Serial Experiments Lain (again)",
  motto: "No matter where you go, everyone's connected."
}`
              },
              'work.ts': {
                name: 'work.ts',
                type: 'file',
                content: `export const work = {
  role: "Full-Stack Developer",
  focus: ["Next.js", "React", "TypeScript", "Node.js"],
  experience: "Building modern web applications",
  availability: "Open to opportunities"
}`
              },
              'skills.ts': {
                name: 'skills.ts',
                type: 'file',
                content: `export const skills = {
  languages: ["TypeScript", "JavaScript", "Python"],
  frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "FastAPI", "MongoDB", "PostgreSQL", "Drizzle ORM"],
  tools: ["Git", "Docker", "Vercel", "NeoVim"],
  learning: ["Go", "Rust", "GraphQL", "Kubernetes"]
}`
              },
              'gear.ts': {
                name: 'gear.ts',
                type: 'file',
                content: `export const gear = {
  editor: "NeoVim",
  terminal: "kitty",
  shell: "zsh with Zap-Zsh",
  theme: "Tokyo Night (Night)",
  font: "Cascadia Code Mono",
  os: "Arch Linux (btw)",
  browser: "Firefox",
  wm: "Hyprland"
}`
              }
            }
          },
          projects: {
            name: 'projects',
            type: 'directory',
            children: {
              'README.md': {
                name: 'README.md',
                type: 'file',
                content: `# Projects

Coming soon! Featured projects will be listed here.

Use 'ls projects/' to see available projects.`
              }
            }
          },
          articles: {
            name: 'articles',
            type: 'directory',
            children: {
              'README.md': {
                name: 'README.md',
                type: 'file',
                content: `# Articles

Technical writing and blog posts coming soon!

Use 'ls articles/' to see available articles.`
              }
            }
          },
          'guest-book': {
            name: 'guest-book',
            type: 'directory',
            children: {
              'README.md': {
                name: 'README.md',
                type: 'file',
                content: `# Guest Book

Leave a message! (Feature in development)

This will be an interactive guest book where visitors can leave messages.`
              }
            }
          },
          resume: {
            name: 'resume',
            type: 'directory',
            children: {
              'resume.pdf': {
                name: 'resume.pdf',
                type: 'file',
                content: 'Binary file - resume.pdf'
              }
            }
          },
          stats: {
            name: 'stats',
            type: 'directory',
            children: {
              'README.md': {
                name: 'README.md',
                type: 'file',
                content: `# Stats

Portfolio statistics and analytics coming soon!`
              }
            }
          },
          games: {
            name: 'games',
            type: 'directory',
            children: {
              'README.md': {
                name: 'README.md',
                type: 'file',
                content: `# Terminal Games

Available games:
- snake (coming soon)
- space-invaders (coming soon)

Terminal games built with ASCII art and keyboard controls.`
              }
            }
          }
        }
      }
    }
  }
}

export function resolvePath(currentPath: string, targetPath: string): string {
  if (targetPath.startsWith('/')) {
    return targetPath
  }

  if (targetPath === '..') {
    const parts = currentPath.split('/').filter(Boolean)
    parts.pop()
    return '/' + parts.join('/')
  }

  if (targetPath === '.') {
    return currentPath
  }

  const normalized = currentPath.endsWith('/') ? currentPath : currentPath + '/'
  return normalized + targetPath
}

export function getNode(path: string): VirtualFile | null {
  const parts = path.split('/').filter(Boolean)
  let current: VirtualFile | undefined = fileSystem.home

  for (const part of parts) {
    if (!current || current.type !== 'directory' || !current.children) {
      return null
    }
    current = current.children[part]
  }

  return current || null
}

export function listDirectory(path: string): string[] {
  const node = getNode(path)
  if (!node || node.type !== 'directory' || !node.children) {
    return []
  }
  return Object.keys(node.children)
}
