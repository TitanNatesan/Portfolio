# TitanDev Portfolio 🚀

A modern, fully responsive portfolio website showcasing full-stack development expertise, built with Next.js, React, and cutting-edge web technologies.

## 🎨 Features

- **Responsive Design**: Seamlessly adapts from mobile to desktop with optimized performance
- **Interactive Animations**: Smooth scroll animations, particle effects, and tilt interactions
- **Mobile Optimized**: 
  - Full-saturated skill cards without hover effects on mobile
  - Reduced particle count (50 particles) for better performance
  - Disabled particle interactions (click/hover) on touch devices
- **Modern UI Components**:
  - Gradient text with glitch effects
  - Spotlight and parallax backgrounds
  - Smooth typing animations
  - Dynamic particle background system
- **Performance Optimized**: Next.js 13+ with App Router, image optimization, and lazy loading
- **Skill Categories**: Full Stack, Dev Tools, and AI/ML expertise showcase
- **Project Portfolio**: Featured projects with detailed descriptions
- **Contact Integration**: Direct messaging capabilities

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 13+](https://nextjs.org) - React with server-side rendering
- **Styling**: Tailwind CSS with custom CSS modules
- **Animations**: 
  - Framer Motion for smooth transitions
  - React Tsparticles for interactive particle effects
  - CSS animations for glitch and typing effects
- **Icons**: React Icons library
- **Images**: Next.js Image optimization

### Development Tools
- **Linting**: ESLint for code quality
- **Styling**: PostCSS for advanced CSS processing
- **Package Manager**: npm/yarn/pnpm

## 📱 Responsive Features

The portfolio includes sophisticated responsive design:

| Feature       | Desktop                         | Mobile                     |
| ------------- | ------------------------------- | -------------------------- |
| Particles     | 150 count                       | 50 count                   |
| Interactions  | Full (click/hover)              | Disabled                   |
| Skills Filter | Grayscale → Full color on hover | Always full color          |
| Layout        | Side card + main content        | Stacked layout             |
| Animations    | Enhanced with transforms        | Simplified for performance |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm, yarn, pnpm, or bun

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The page auto-refreshes as you edit files.

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.js            # Root layout wrapper
│   ├── page.jsx             # Main home page
│   ├── sitemap.js           # SEO sitemap
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── main/                # Main content sections
│   │   ├── sections/        # Individual page sections
│   │   ├── data/            # Portfolio data
│   │   └── main.css         # Section styles
│   ├── navbar/              # Navigation component
│   ├── sidecard/            # Profile sidebar
│   ├── ui/                  # Reusable UI components
│   └── ParticlesBackground.jsx  # Particle system
├── config/                  # Configuration files
│   └── particles.config.js  # Particle system config
├── hooks/                   # Custom React hooks
│   ├── useLoadAnime.js     # Load animations
│   └── useScrollAnime.js   # Scroll animations
└── lib/                     # Utilities
    └── theme.js            # Theme configuration

public/
├── projects/                # Project showcase images
├── skills/                  # Skill icons/logos
└── particles.json          # Particle presets
```

## 🎯 Key Components

### ParticlesBackground
Interactive particle system with mobile optimizations:
- Desktop: 150 particles with click/hover interactions
- Mobile: 50 particles with interactions disabled
- Smooth gravity and movement with collision detection

### SideCard
Fixed profile sidebar featuring:
- Profile image with 3D tilt effect (disabled on mobile)
- Social media links with hover effects
- Resume download button
- Responsive design (fixed on desktop, stacked on mobile)

### Sections
- **Hero**: Animated introduction with typing effect
- **About**: Portfolio description and highlights
- **Skills**: Categorized tech stack with visual icons
- **Projects**: Featured portfolio projects
- **Resume**: Timeline of experience and education
- **Contact**: Direct messaging form

## 🎨 Customization

### Update Portfolio Content
Edit `src/components/main/data/portfolioData.js` to customize:
- Skills and tech stack
- Projects and descriptions
- Experience timeline
- Social media links

### Modify Particles
Adjust particle behavior in `src/config/particles.config.js`:
- Particle count and density
- Interaction modes
- Animation speed and gravity

### Theme Colors
Update color schemes in `src/lib/theme.js` and CSS files

## 🌐 Deployment

### Deploy on Vercel (Recommended)

The easiest deployment option from the creators of Next.js:

```bash
# Push to GitHub, then connect to Vercel
# Automatic deployments on every push
```

[Deploy to Vercel →](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

### Other Hosting Options
- **Netlify**: Supports Next.js with automatic builds
- **AWS Amplify**: Enterprise-grade hosting
- **Self-hosted**: Docker container deployment

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs) - Complete framework guide
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Community and issues

### React & Web Technologies
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Titan Natesan** - Full Stack Developer & AI Enthusiast

- Portfolio: [titannatesan.me](https://titannatesan.me)
- GitHub: [@TitanNatesan](https://github.com/TitanNatesan)
- LinkedIn: [titannatesan](https://linkedin.com/in/titannatesan)
- Instagram: [@titan_natesan](https://instagram.com/titan_natesan)

## 🙏 Acknowledgments

- [Vercel Next.js Team](https://vercel.com) - Framework and deployment platform
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Tsparticles](https://tsparticles.dev) - Particle animation library

---

**Made with ❤️ by Titan Natesan** | Last updated: February 2026
