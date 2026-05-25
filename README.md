# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# 🤖 Nova AI Chatbot

A modern AI-powered chatbot built using **React**, **Tailwind CSS**, and **Google Gemini 2.5 Flash**.

Nova AI provides a futuristic conversational experience with a premium dark UI, real-time AI responses, smooth animations, and intelligent chat interactions.

---

# ✨ Features

- 🤖 Google Gemini 2.5 Flash Integration
- 💬 Real-time AI Chat
- 🔐 API Key Authentication Flow
- 💾 Local Storage API Key Support
- ⚡ Fast & Responsive Interface
- 🌙 Premium Dark Theme
- 🎨 Modern Glassmorphism UI
- 📱 Fully Responsive Design
- ⏳ AI Loading Animations
- 🛡️ Error Handling
- 🧠 Chat History Management
- ✨ Smooth Animations & Micro Interactions

---

# 🛠️ Tech Stack

- React
- Tailwind CSS
- Vite
- Google Generative AI SDK
- Framer Motion
- Lucide React Icons


---

# 🎨 UI Highlights

- Minimal futuristic AI interface
- Smooth transitions & animations
- Floating chat input
- Neon glow effects
- Elegant typography
- Glassmorphism design
- Clean reusable components

---

# ⚙️ Functionalities

- Send prompts to Gemini AI
- Receive AI-generated responses
- Dynamic chat rendering
- AI typing/loading state
- Error handling
- Persistent API key storage

---

---

# 🔒 Security Note

Do not expose production API keys directly on the frontend.

For production applications:
- Use backend APIs
- Store secrets securely
- Implement authentication

---

# 📌 Future Improvements

- 🎤 Voice Assistant
- 🖼️ Image Generation
- 🧠 AI Memory
- 💾 Chat Export
- 🌐 Multi-language Support
- 👤 Authentication System
- 🎨 Theme Customization

---
