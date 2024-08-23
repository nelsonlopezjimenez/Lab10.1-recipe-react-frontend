# Log: 

## 8.23.2024
1. Vite installs faster, run faster but cors persisted.
1. Branch : vite-react
1. switch back into regular create-react-app 
1. Branch: main
1. 

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## vite-react errors 
1. Access to fetch at 'http://localhost:3999/api/v1/recipe' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:22022' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.Understand this error
api.jsx:10       
1. GET http://localhost:3999/api/v1/recipe net::ERR_FAILED
```
getRecipes @ api.jsx:10
loadRecipes @ App.jsx:157
(anonymous) @ App.jsx:175
commitHookEffectListMount @ react-dom_client.js?v=f9c40f57:16913
commitPassiveMountOnFiber @ react-dom_client.js?v=f9c40f57:18154
commitPassiveMountEffects_complete @ react-dom_client.js?v=f9c40f57:18127
commitPassiveMountEffects_begin @ react-dom_client.js?v=f9c40f57:18117
commitPassiveMountEffects @ react-dom_client.js?v=f9c40f57:18107
flushPassiveEffectsImpl @ react-dom_client.js?v=f9c40f57:19488
flushPassiveEffects @ react-dom_client.js?v=f9c40f57:19445
(anonymous) @ react-dom_client.js?v=f9c40f57:19326
workLoop @ react-dom_client.js?v=f9c40f57:195
flushWork @ react-dom_client.js?v=f9c40f57:174
performWorkUntilDeadline @ react-dom_client.js?v=f9c40f57:382
Show 11 more frames
Show lessUnderstand this error
```
1. localhost/:1 Access to fetch at 'http://localhost:3999/api/v1/recipe' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:22022' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.Understand this error
api.jsx:10 
1. Uncaught (in promise) TypeError: Failed to fetch
```
    at Module.getRecipes (api.jsx:10:10)
    at loadRecipes (App.jsx:157:36)
    at App.jsx:175:5
    at commitHookEffectListMount (react-dom_client.js?v=f9c40f57:16913:34)
    at commitPassiveMountOnFiber (react-dom_client.js?v=f9c40f57:18154:19)
    at commitPassiveMountEffects_complete (react-dom_client.js?v=f9c40f57:18127:17)
    at commitPassiveMountEffects_begin (react-dom_client.js?v=f9c40f57:18117:15)
    at commitPassiveMountEffects (react-dom_client.js?v=f9c40f57:18107:11)
    at flushPassiveEffectsImpl (react-dom_client.js?v=f9c40f57:19488:11)
    at flushPassiveEffects (react-dom_client.js?v=f9c40f57:19445:22)
getRecipes @ api.jsx:10
loadRecipes @ App.jsx:157
(anonymous) @ App.jsx:175
commitHookEffectListMount @ react-dom_client.js?v=f9c40f57:16913
```