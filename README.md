# BTU Codes

A modern web platform for showcasing projects, built with Next.js 15, Sanity CMS, and Tailwind CSS.

## 🌐 Production Website

The project is deployed and running at: [https://www.btu.codes](https://www.btu.codes)

## 🚀 Features

- **Project Showcase**: Display projects with rich media and descriptions
- **User Authentication**: Secure login with Next-Auth
- **Content Management**: Integrated Sanity CMS for easy content updates
- **Responsive Design**: Beautiful UI that works on all devices
- **Search Functionality**: Find projects quickly with advanced search
- **Markdown Support**: Rich text editing for project descriptions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **CMS**: Sanity.io
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, shadcn/ui components
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Sanity.io account

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/erarslan/btu.codes.git
   cd btu.codes
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```
   AUTH_SECRET="your_auth_secret"
   AUTH_GITHUB_ID="your_github_id"
   AUTH_GITHUB_SECRET="your_github_secret"
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   SANITY_WRITE_TOKEN="your_sanity_write_token"
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
btu.codes/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── (root)/           # Main application routes
│   ├── studio/           # Sanity Studio integration
│   └── ...
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...
├── lib/                  # Utility functions and shared code
├── public/               # Static assets
├── sanity/               # Sanity configuration and schemas
│   ├── schemaTypes/      # Content type definitions
│   └── ...
└── ...
```

## 🧩 Sanity CMS

This project uses Sanity.io as a headless CMS. The Sanity Studio is integrated directly into the Next.js application and can be accessed at `/studio`.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

If you have any questions or feedback, please reach out to [emrerars@gmail.com](mailto:emrerars@gmail.com).
