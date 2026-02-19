# 📘 React, Node & Tooling – Clean Study Notes

---

## 🔁 Effect Hooks (useEffect)

### What does useEffect do?

`useEffect` lets you run **side effects** in React components, such as:

* Fetching data
* Subscribing to events
* Manually changing the DOM

### Important rule

```js
useEffect(() => {
  // effect logic
}, [])
```

* The **empty dependency array (`[]`)** means:
  👉 the effect runs **only once**, when the component is rendered for the first time (on mount).

---

## 📦 npm & Project Setup

### Frontend (Vite + React)

#### Create project

```bash
# npm 6.x
npm create vite@latest introdemo --template react

# npm 7+
npm create vite@latest introdemo -- --template react
```

```bash
cd introdemo
npm install
npm run dev
```

#### Common libraries

```bash
npm install axios
npm install json-server --save-dev
npm install react-router-dom
```

---

### Backend (Node.js)

```bash
npm init                  # create package.json
npm start                 # run script defined in package.json
node --watch index.js     # auto-restart server on changes
```

Dev mode shortcut:

```json
"scripts": {
  "dev": "node --watch index.js"
}
```

```bash
npm run dev
```

---

## 🐙 Git & GitHub Basics

```bash
git status
git add .
git commit -m "message"
git push
```

### ⏪ Go back to an old commit

```bash
git log                       # show commit history
git reset --hard <hash>       # reset local repo
git push origin HEAD --force  # force push to GitHub
```

---

## 🚀 Deployment / Production Services

* Heroku
* Fly.io
* Render
* Replit
* CodeSandbox

---

## 🌐 HTTP Status Code – 400 Bad Request

**400 (Bad Request)** means:

* The server **refused to process the request**
* Caused by a **client-side error**, such as:

  * Invalid request body
  * Malformed JSON
  * Missing required fields

---

## 🍃 Mongoose Validators & Update Operations

### Problem

Mongoose **does NOT run validators by default** for:

* `updateOne()`
* `updateMany()`
* `findOneAndUpdate()`
* `update()`

Example (❌ no error):

```js
Person.updateOne({}, { name: '' })
```

### Solution

Enable validators manually:

```js
{ runValidators: true }
```

Example:

```js
Person.findOneAndUpdate(
  { _id: id },
  { number: newNumber },
  { new: true, runValidators: true }
)
```

### Why validators are OFF by default

1. Only updated fields are validated
2. Some validators behave differently (e.g. `required`)

### Summary

* **Create / save → validators ON**
* **Update methods → validators OFF**
* Enable with `runValidators: true`

🔗 Docs: [https://mongoosejs.com/docs/validation.html#custom-validators](https://mongoosejs.com/docs/validation.html#custom-validators)

---

## 🧹 ESLint Setup

```bash
npm install eslint @eslint/js --save-dev
npx eslint --init
npm install --save-dev @stylistic/eslint-plugin
```

## Webpack

```bash
npm install --save-dev webpack webpack-cli
npm install --save-dev webpack-dev-server
```

Run ESLint:

```bash
npx eslint index.js
npx eslint . --fix
```

package.json script:

```json
"lint": "eslint ."
```

---

## 📝 Notes for Larger Projects

* Use **node-config** for configuration
* Use **separate test database** (preferably local when working in a team)

---

## 🧪 Testing Commands

```bash
npm test -- --test-only
npm test -- path/to/testfile
npm test -- --test-name-pattern="specific test name"
```

---

## 🎭 End-to-End Testing (Playwright)

```bash
npm init playwright@latest
```

package.json:

```json
"scripts": {
  "test": "playwright test",
  "test:report": "playwright show-report"
}
```

Run tests:

```bash
npm run test -- --ui
npm test -- --project chromium
```

---

## 🪝 Hooks Rules & Limitations

✅ Hooks must be called:

* At the **top level** of a component
* At the **top level** of a custom hook

❌ Do NOT call hooks:

* Inside loops
* Inside conditions
* Inside nested functions

ESLint plugin:

```bash
npm install eslint-plugin-react-hooks --save-dev
```

---

## 🔗 Useful Links

* Awesome collection of community-maintained React Hooks  
  [https://github.com/rehooks/awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

* Practical and reusable React Hooks with clear examples  
  [https://usehooks.com/](https://usehooks.com/)

* Deep explanation of why React Hooks rely on call order (by Dan Abramov)  
  [https://overreacted.io/why-do-hooks-rely-on-call-order/](https://overreacted.io/why-do-hooks-rely-on-call-order/)

* Popular CSS framework for building responsive websites  
  [https://getbootstrap.com/](https://getbootstrap.com/)

* Bootstrap components rebuilt specifically for React  
  [https://react-bootstrap.github.io/](https://react-bootstrap.github.io/)

* Material Design–based UI component library for React (MUI)  
  [https://mui.com/](https://mui.com/)

* Official Material Design system and guidelines by Google  
  [https://material.io/](https://material.io/)

* Online tool for live previewing and testing Markdown syntax  
  [https://markdownlivepreview.com](https://markdownlivepreview.com)

* Express.js official documentation for backend security best practices  
  [https://expressjs.com/en/advanced/best-practice-security.html](https://expressjs.com/en/advanced/best-practice-security.html)

* Helmet — middleware to secure Express apps using HTTP headers  
  [https://helmetjs.github.io/](https://helmetjs.github.io/)

* ESLint-related security tooling (note: link points to Helmet site)  
  [https://helmetjs.github.io/](https://helmetjs.github.io/)

* Article discussing whether Google can index React-rendered content (SEO)  
  [https://www.javascriptstuff.com/react-seo/](https://www.javascriptstuff.com/react-seo/)

* Article explaining SEO vs React and whether backend rendering is needed  
  [http://freecodecamp.org/news/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9](http://freecodecamp.org/news/seo-vs-react-is-it-neccessary-to-render-react-pages-in-the-backend-74ce5015c0c9)

* Explanation of the difference between isomorphic and universal JavaScript  
  [https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb)

* Concise list of React patterns and best practices  
  [https://reactpatterns.com/](https://reactpatterns.com/)

* Collection of small React patterns, tips, and reusable ideas  
  [https://vasanthk.gitbooks.io/react-bits/](https://vasanthk.gitbooks.io/react-bits/)

---

## ⌨️ Keyboard Shortcuts

View MD files in VS-Code
```shortcut
CTRL+SHIFT+V
```

## 🔐 Security
```bash
npm audit
npm audit fix
npm outdated --depth 0 //You can check how up-to-date your dependencies are using the command
npm install -g npm-check-updates
ncu -u
```
## 💄 Prettier
install
```bash
npm install --save-dev --save-exact prettier
```
create empty config file
```bash
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```
create .prettierignore file
```bash
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```
Install eslint-config-prettier:
```bash
npm i -D eslint-config-prettier
```
format all files with prettier
```bash
npx prettier . --write
```
---

## 👨‍💼 State Mgmt in React Apps

* useState
* Redux
* useReducer + Context
* Tanstack React Query
---
# Tanstack React Query
```bash
npm install @tanstack/react-query
```
---
✅ Cleaned, structured, and course-aligned ✨
