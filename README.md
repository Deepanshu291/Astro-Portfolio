# 🚀 Astro Developer Portfolio

> A blazingly fast, type-safe portfolio template for developers who care about performance and developer experience.

[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🎯 Why This Portfolio?

Your GitHub profile isn't enough anymore. In 2026, you need a portfolio that's:
- ⚡ **Fast** – Sub-second load times with 90+ Lighthouse scores
- 🎨 **Beautiful** – Modern UI that doesn't compromise on performance
- 🛠️ **Developer-friendly** – Type-safe content, no prop drilling, zero config bloat
- 📝 **Content-first** – Write in YAML/Markdown, not JSX

**TL;DR:** This isn't another Bootstrap template. It's a modern, Astro-powered portfolio with near-zero JavaScript, island architecture, and type-safe content schemas.

**TL;DR:** This isn't another Bootstrap template. It's a modern, Astro-powered portfolio with near-zero JavaScript, island architecture, and type-safe content schemas.

## ✨ Tech Stack

- **[Astro](https://astro.build)** – Near-zero JS in production, island architecture
- **[React](https://reactjs.org/)** – For interactive components only (hydrated on demand)
- **[TypeScript](https://www.typescriptlang.org/)** – Type safety across the board
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first styling without the bloat
- **[Zod](https://zod.dev/)** – Runtime type validation for content schemas
- **[MDX](https://mdxjs.com/)** – Markdown with React component support

## 🚀 Features

### Performance First
- ⚡ **Lighthouse 90+** scores out of the box
- 🏝️ **Island architecture** – Only hydrate what needs interactivity
- 📦 **Minimal JS bundle** – Ship less, load faster
- 🎯 **Optimized builds** – Astro's smart bundling and code splitting

### Content Management
- 📝 **Markdown/MDX blogs** – Write once, publish everywhere
- 🎯 **Type-safe YAML** – Zod schemas catch errors before deployment
- 🔄 **Hot reload** – See changes instantly
- 📁 **Content collections** – Organized, validated content

### Developer Experience  
- 🛠️ **TypeScript** – Full type safety
- 🎨 **Tailwind CSS** – Utility-first styling
- 🧩 **Component library** – Pre-built React components
- 🔧 **Zero config** – Works out of the box

### UI/UX
- 🌓 **Animated theme toggle** – Smooth dark/light mode transitions
- 📱 **Mobile-first responsive** – Looks great on all devices
- ✨ **Cool animations** – Meteors, particles, aurora text, shiny borders
- 🎭 **Smooth transitions** – View transitions API support

### SEO & Discovery
- 🔍 **SEO optimized** – Meta tags, OG images, structured data
- 🗺️ **Sitemap generation** – Automatic sitemap.xml
- 📊 **Analytics ready** – Easy integration with tracking tools
- 🚀 **Performance metrics** – Core Web Vitals optimized

## 📋 Quick Start

### Prerequisites

- **Node.js** v18+ (v20 recommended)
- **npm** or **pnpm**
- **Git**

### Installation

```bash
# Clone the repo
git clone https://github.com/Deepanshu291/Astro-Portfolio.git
cd Astro-Portfolio

# Install dependencies
npm install
# or
pnpm install

# Start dev server
npm run dev
```

Visit `http://localhost:4321` 🎉

### Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run astro` | Run Astro CLI commands |

## ⚙️ Configuration

### Customizing Your Profile

The main profile information is stored in `src/content/profile.yml`. Open this file and update it with your details:

```yaml
profile:
  name: "Your Name"
  title: "Your Professional Title"
  greeting: "Hi, I'm"
  tagline: "Your tagline here"
  description: >
    Your bio description goes here.
    Tell people about yourself and what you do.
  email: "your.email@example.com"
  location: "Your City, Country"
  
  roles:
    - "Full Stack Developer 🚀"
    - "Your Role 🤖"
  
  image: "your-image-url-here"
  
  social:
    - name: "GitHub"
      url: "https://github.com/yourusername"
      icon: "github"
      username: "@yourusername"
    
    - name: "LinkedIn"
      url: "https://linkedin.com/in/yourusername"
      icon: "linkedin"
      username: "yourusername"
  
  skills:
    - "javaScript"
    - "typeScript"
    - "react"
    # Add your skills here
```

### Adding Projects

Edit `src/content/projects.yml` to add your projects:

```yaml
title: "My Projects"
heading: "Things I've Built"
description: "A collection of my work"

projects:
  - title: "Project Name"
    dates: "Jan 2026 - Present"
    sourceUrl: "https://github.com/yourusername/project"
    description: "Brief description of your project"
    imageUrl: "project-image-url"
    projectUrl: "https://your-project-demo.com"
    techStack:
      - "React"
      - "Node.js"
      - "MongoDB"
```

### Adding Work Experience

Update `src/content/workexp.yaml` with your professional experience:

```yaml
experience:
  heading: "Where I've Worked"
  jobs:
    - company: "Company Name"
      position: "Your Position"
      location: "City, Country"
      startDate: "Jan 2026"
      endDate: "Present"
      description: "Brief description of your role"
      responsibilities:
        - "Key responsibility 1"
        - "Key responsibility 2"
        - "Key responsibility 3"
      techStack:
        - "Technology 1"
        - "Technology 2"
      highlights:
        - "Achievement 1"
        - "Achievement 2"
```

## ✍️ Writing Blog Posts

### Creating a New Blog Post

1. Create a new markdown file in `src/content/blogs/`:

```bash
touch src/content/blogs/my-first-post.md
```

2. Add the frontmatter and content:

```markdown
---
title: 'My Awesome Blog Post'
description: 'A brief description of the post'
pubDate: '2026-01-28'
heroImage: '/blog-images/my-post.jpg'
tags: ['JavaScript', 'Tutorial']
readtime: '5 min'
---

# My Awesome Blog Post

Your content goes here! You can use **markdown** to format your text.

## Code Examples

You can include code snippets:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Images

![Alt text](/path/to/image.jpg)
```

### Blog Post Schema

The blog posts must follow this schema (defined in `content.config.ts`):

- **title** (required): The title of your blog post
- **description** (optional): A short description
- **pubDate** (required): Publication date in YYYY-MM-DD format
- **tags** (optional): Array of tags
- **readtime** (optional): Estimated reading time
- **heroImage** (optional): Hero image URL

## 🎨 Customizing Components

### Modifying UI Components

All UI components are located in `src/components/ui/`. You can customize them to match your style:

```typescript
// Example: Customizing the badge component
// src/components/ui/badge.tsx

import { cn } from "@/lib/utils"

export function Badge({ children, className }: BadgeProps) {
  return (
    <div className={cn(
      "px-3 py-1 rounded-full bg-primary text-white",
      className
    )}>
      {children}
    </div>
  )
}
```

### Updating Global Styles

Edit `src/styles/global.css` to change colors, fonts, and other global styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* Add your custom CSS variables */
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Deepanshu291/Astro-Portfolio)

```bash
# Or use CLI
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod
```

### GitHub Pages

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repo-name',
});
```

Then build and deploy:

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🔧 Troubleshooting

### Common Issues

**Dependencies won't install**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use**
```bash
npm run dev -- --port 3000
```

**Build fails**
- Check YAML schema matches `content.config.ts`
- Validate date formats (YYYY-MM-DD)
- Ensure all required frontmatter fields are present

## � Project Structure

```
portfolio/
├── src/
│   ├── components/      # Astro & React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Hero.astro
│   │   └── ...
│   ├── content/        # Content collections
│   │   ├── blogs/     # Blog posts (MD/MDX)
│   │   ├── profile.yml
│   │   ├── projects.yml
│   │   └── workexp.yaml
│   ├── layouts/       # Page layouts
│   ├── pages/         # File-based routing
│   ├── styles/        # Global CSS
│   └── lib/          # Utilities
├── public/           # Static assets
├── astro.config.mjs  # Astro config
└── tsconfig.json     # TypeScript config
```

## 🎯 Next Steps

Now that you have your portfolio set up:

1. ✅ Customize your profile information
2. ✅ Add your projects
3. ✅ Write your first blog post
4. ✅ Update the styling to match your brand
5. ✅ Deploy to production
6. ✅ Share it with the world!

## 💡 Tips & Best Practices

- **Keep it updated**: Regular updates show you're active
- **Write blog posts** – Share your knowledge and experiences
- **Optimize images** – Use WebP format for better performance
- **SEO matters** – Fill in meta descriptions and titles
- **Test responsiveness** – Check on different devices
- **Add analytics** – Track visitors with Google Analytics

## 🛠️ Built With

- [Astro](https://astro.build) - Web framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Language
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zod](https://zod.dev/) - Schema validation
- [Simple Icons](https://simpleicons.org/) - Skill icons

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💖 Support

If you found this helpful:
- ⭐ Star the repository
- 🐦 Share on social media
- 🔗 Link back to this repo
- 🍕 Buy me a coffee (if you're feeling generous)

## 📧 Contact

**Deepanshu Sharma**
- GitHub: [@Deepanshu291](https://github.com/Deepanshu291)
- LinkedIn: [deepanshu291](https://linkedin.com/in/deepanshu291)
- Email: deepanshu2912001@gmail.com

---

<div align="center">

**Built with ❤️ using Astro**

[⬆ back to top](#-astro-developer-portfolio)

</div>