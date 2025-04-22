# Orange CV & Chatbot

A modern, responsive CV viewer and AI chatbot built with Next.js, TypeScript, and Tailwind CSS. Featuring a Markdown-driven CV modal, interactive chat support, and a placeholder for PDF download functionality.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo

> **Live Preview:** Coming soon via GitHub Pages or Vercel.

![CV Modal Preview](docs/cv-modal.png)
![Chatbot Preview](docs/chatbot-preview.png)

*(Replace with actual screenshots in `docs/` folder.)*

---

## Features

- **CV Modal**: View a fully formatted CV parsed from Markdown.
- **Interactive Chatbot**: Ask predefined or custom questions.
- **Responsive Design**: Mobile-friendly layout and optimized UI.
- **Future PDF Export**: Placeholder for client-side PDF download using `html2pdf.js`.
- **Theming & Styling**: Uses Tailwind CSS and Lucide Icons.

---

## Technology Stack

- Next.js (v13+)
- React 18
- TypeScript
- Tailwind CSS
- `html2pdf.js` (for PDF export placeholder)
- `lucide-react` for icons

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/orange-cv-app.git
   cd orange-cv-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

- Open your browser and navigate to `http://localhost:3000`.
- Click the **CV** button in the top-right corner to view the CV.
- Use the chat input to ask questions or select quick actions.

---

## Usage

- **View CV**: Click the orange **CV** button to open the modal.
- **Ask Questions**: Use the input field or quick suggestion bubbles.
- **Mobile Alignment**: Input and **Odoslať** button are aligned for mobile.
- **PDF Export**: (Coming soon) Click the download icon in the modal header.

---

## Folder Structure

```
orange-cv-app/
├── public/               # Static assets (images, icons, backgrounds)
├── src/
│   ├── app/              # Next.js App Router pages
│   │   └── page.tsx      # Main landing page and chat UI
│   ├── components/       # React components
│   │   ├── CvModal.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── Header.tsx
│   │   └── QuickActions.tsx
│   ├── lib/              # Helper libraries
│   │   ├── cvContent.ts  # Markdown content for CV
│   │   └── cvParser.ts   # Markdown-to-data parser
│   └── hooks/            # Custom React hooks
│       ├── useChat.ts
│       └── useAutoScroll.ts
├── docs/                 # (Optional) Screenshots and documentation
├── html2pdf.d.ts         # TypeScript module declaration for pdf export
├── package.json
├── tsconfig.json
└── README.md
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please ensure your code adheres to existing style and includes relevant tests if applicable.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

- **Email**: [adambartko159@gmail.com](mailto:adambartko159@gmail.com)
- **LinkedIn**: [adam-bartko-274a6327b](https://www.linkedin.com/in/adam-bartko-274a6327b/) 