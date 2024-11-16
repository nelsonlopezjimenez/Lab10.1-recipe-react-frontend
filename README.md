# Log

## 11.16.2024
1. Working mobile-first
By default, Tailwind uses a mobile-first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.
1. What this means is that unprefixed utilities (like uppercase) take effect on all screen sizes, while prefixed utilities (like md:uppercase) only take effect at the specified breakpoint and above.
1. For this reason, it’s often a good idea to implement the mobile layout for a design first, then layer on any changes that make sense for sm screens, followed by md screens, etc.
1. About forms styling and flex syntax https://flowbite.com/docs/forms/input-field/

## 11.2.2024 mdy
1. Start  cleaning. Get rid of vite files and refactor class components into function components
1. npm update before running npm install
1. This is the frontend of Lab10.1-recipe-api backend. 

## 8.23.2024 m.d.y

1. vite-react branch cors issues unresolved
1. lab10.1-recipe-react-frontend branch main externally installed
1. npx create-react-app
1. But before
```sh
source nvs.sh
nvs
```
1. selection b: node 20.11.0
1. npm version: 10.2.4
1. package*.* copied to Lab10.1-recipe-react-frontend
1. 

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
