# 🚢 Azur Lane Wiki

A modern, comprehensive wiki for Azur Lane featuring ships, equipment, tier lists, and strategic guides. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Azur Lane Wiki Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=Azur+Lane+Wiki+Preview)

## ✨ Features

### 🎯 **Comprehensive Ship Database**
- **Complete Ship Statistics** - Base and max level stats for all shipgirls
- **Tier Ratings** - Community-vetted tier lists for different game modes
- **Skill Information** - Detailed skill descriptions and upgrade paths
- **Build Recommendations** - Optimal equipment loadouts for each ship

### ⚔️ **Equipment Guide**
- **Equipment Database** - Complete stats and compatibility information
- **Enhancement Calculator** - Calculate equipment upgrade costs and benefits
- **Tier Lists** - Equipment rankings by ship type and game mode
- **Build Optimizer** - Find the best equipment combinations

### 📊 **Interactive Tools**
- **Fleet Builder** - Plan and optimize your fleet compositions
- **Damage Calculator** - Calculate damage output with different setups
- **Resource Planner** - Plan your resource allocation and farming
- **Event Tracker** - Stay updated with current and upcoming events

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Automatic theme switching based on system preferences
- **Fast Performance** - Built with Next.js 15 and optimized for speed
- **Accessibility** - WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ryzalain/azur-wiki.git
   cd azur-wiki
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL and other settings
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
azur-wiki/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ship/               # Ship-related components
│   │   ├── equipment/          # Equipment components
│   │   └── ui/                 # Reusable UI components
│   ├── lib/                    # Utility functions
│   ├── types/                  # TypeScript type definitions
│   └── generated/              # Generated Prisma types
├── prisma/                     # Database schema
├── public/                     # Static assets
└── docs/                       # Documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts

## 📱 Screenshots

### Homepage
![Homepage Preview](https://via.placeholder.com/600x400/1e293b/ffffff?text=Homepage+Preview)

### Ship Database
![Ship Database Preview](https://via.placeholder.com/600x400/1e293b/ffffff?text=Ship+Database+Preview)

### Equipment Guide
![Equipment Guide Preview](https://via.placeholder.com/600x400/1e293b/ffffff?text=Equipment+Guide+Preview)

### Fleet Builder
![Fleet Builder Preview](https://via.placeholder.com/600x400/1e293b/ffffff?text=Fleet+Builder+Preview)

## 🎮 Game Integration

### Data Sources
- **Koumakan Wiki API** - Primary data source for ship and equipment information
- **Community Tier Lists** - Aggregated tier lists from multiple sources
- **Equipment Calculators** - Integration with community calculation tools
- **Event Data** - Real-time event information and updates

### Features in Development
- 🔄 **Real-time Updates** - Live data synchronization with game updates
- 🤖 **AI Recommendations** - Intelligent ship and equipment suggestions
- 📊 **Advanced Analytics** - Detailed performance metrics and comparisons
- 🌐 **Multi-language Support** - Support for multiple languages
- 📱 **Mobile App** - Companion mobile application

## 🤝 Contributing

We welcome contributions from the Azur Lane community! Here's how you can help:

### Ways to Contribute
- 🐛 **Report Bugs** - Found a bug? Let us know!
- 💡 **Suggest Features** - Have an idea? We'd love to hear it!
- 📝 **Improve Documentation** - Help make the wiki better
- 🔧 **Code Contributions** - Submit pull requests for improvements
- 🌍 **Translations** - Help translate to other languages

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Azur Lane Community** - For the amazing community and feedback
- **Koumakan Wiki** - For providing comprehensive game data
- **Community Contributors** - For tier lists, guides, and translations
- **Open Source Libraries** - For the amazing tools that make this possible

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/ryzalain/azur-wiki/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/ryzalain/azur-wiki/discussions)
- 📧 **Email**: [Contact Us](mailto:support@azurlanewiki.com)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ryzalain/azur-wiki&type=Date)](https://star-history.com/#ryzalain/azur-wiki&Date)

---

<div align="center">

**Made with ❤️ by the Azur Lane Community**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>