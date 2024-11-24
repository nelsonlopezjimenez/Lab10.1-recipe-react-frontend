# Log

## 11.24.2024
1. Added react-hook-form library. It is small, and zero dependencies.
1. It uses uncontrolled inputs with ref instead of depending on the state to control the inputs
1. It reduces the number of renders: basically after each keystroke.
1. Many other libraries support the ref attribute
1. found in https://blog.logrocket.com/react-hook-form-complete-guide/
1. npm install react-hook-form
1. To register the input, pass the register method using spread operator. 
1. HTML element's name must be unique, not need to assign a value as for controlled inputs
1. No need to add onChange method. 
1. With controlled input, value is determined and uneditable. 
1. PUT vs PATCH: put whole data to be sent, patch: only the field that changed
1. In current case, not worries what to send since the form is repopulated all the field and edited those that need to be edited
1. When showing the EditForm, if oneRecipe is still undefined the program crashes. 
1. I use a conditional with the same expression on both sides, since I was not sure what exactly was happening.
1. Once I figured the true/false rendering, I selected the else to null, and no more errors appeared. It was an _id to prevent passing undefined and crashing the app.
1. The origina FormEdit.js is not used furthermore.
1. The problem with ingredients was solved by setting "inputs" to null. 
1. Pending to work with nested array of ingredient inputs.
1. 


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
