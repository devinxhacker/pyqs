# MITAoE PYQs - Previous Year Question Papers

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](#license)

Enhanced interface for accessing MIT Academy of Engineering (MITAoE) previous year question papers with a subject-focused approach for easier navigation.

![MITAoE PYQs Screenshot](https://mitaoe-pyqs.vercel.app/og-image.png)

## 🎯 Key Features

- **Subject-focused organization** - Find papers by subject name
- **Batch download capability** - Get multiple papers at once
- **Mobile-friendly interface** - Access on any device
- **Fast loading** with client-side caching
- **Advanced filtering** by year and exam type
- **Intelligent subject classification** with fuzzy matching
- **Free access** - No login required

## 📚 Quick Start

Visit [mitaoe-pyqs.vercel.app](https://mitaoe-pyqs.vercel.app) and:
1. Search by subject name (e.g., "Computer Networks")
2. Apply filters for specific years/exam types (optional)
3. Download individual papers or select multiple for batch download

## 🎓 Supported Departments

- 💻 Computer Engineering
- 🧪 Chemical Engineering
- ⚙️ Mechanical Engineering
- 🏗️ Civil Engineering
- ⚡ Electrical Engineering
- 📡 Electronics & Telecommunication
- ➕ and more.

## 💻 For Developers

### Tech Stack

- **Frontend**: Next.js 15
- **Backend**: Next.js API routes
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Deployment**: Vercel

### Local Development

```bash
# Clone the repository
git clone https://github.com/mitaoe/pyqs.git
cd pyqs

# Install dependencies
pnpm install

# Copy env file and configure your MongoDB connection
cp .env.example .env
# Edit the .env file and add your MongoDB URI:
# MONGODB_URI=your_mongodb_connection_string_here

# Generate question papers data for local development
pnpm pyq-gen

# Note: During data generation, you may see 400 errors for E&TC directories in the terminal.
# These specific errors are normal and can be safely ignored. If you encounter other errors,
# please create an issue on GitHub. After completion, check your MongoDB database to
# confirm that the data has been generated.

# Run development server
pnpm dev

# Optional: Run crawler for /browse route data
# pnpm crawl
```

## Acknowledgements

We extend our sincere gratitude to:

- **MIT Academy of Engineering** for their educational resources that make this project possible
- **Our dedicated contributors** whose passion and expertise continue to enhance this platform
- **The open source community** for providing the remarkable tools that power this application
- **MITAoE students** whose feedback and suggestions help us improve continuously

This project stands as a testament to collaborative efforts in making educational resources more accessible.

## Legal Notice

We don't store any papers - all content is served directly from MITAoE servers. This project is maintained by students for educational purposes.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
