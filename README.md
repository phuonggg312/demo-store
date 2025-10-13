# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## 1) Create Project (or move into the target folder)

```powershell
cd "C:\Users\ADMIN\OneDrive\Documents\workspace"

# Create with Vite
npm create vite@latest demo-store -- --template react
cd .\demo-store

# Install base deps
npm i
```

> If you already created the project elsewhere, copy it here:
> ```powershell
> robocopy "D:\code\demo-store" "C:\Users\ADMIN\OneDrive\Documents\workspace\demo-store" /MIR
> ```

---

## 2) Install Tailwind v3 + PostCSS + Autoprefixer + SCSS

We **pin Tailwind v3** because it ships with a CLI out-of-the-box and works smoothly with Vite + SCSS.

```powershell
# Remove any previous tailwind if needed
npm remove tailwindcss

# Install stable Tailwind v3 with CLI + PostCSS + Autoprefixer + Sass
npm i -D tailwindcss@3.4.13 postcss@latest autoprefixer@latest sass

# Initialize configs (Tailwind + PostCSS)
npx tailwindcss init -p
```

If `npx tailwindcss init -p` fails with
`npm ERR! could not determine executable to run`, use one of:
```powershell
.\node_modules\.bin\tailwindcss.cmd init -p
npm exec tailwindcss init -p
node .\node_modules\tailwindcss\lib\cli.js init -p
```

**Update `tailwind.config.js`:**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,scss}"],
  theme: { extend: {} },
  plugins: [],
};
```

**`postcss.config.js`** (auto-created by the init above; keep it as:)
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---
# install React Router
npm i react-router-dom

# API
# install graphQL
npm install graphql graphql-request


# Field of Article (this can see all the properties/attribute)
{
  __type(name: "Article") {
    name
    fields { name }
  }
}
