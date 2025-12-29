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

* [https://github.com/rehooks/awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
* [https://usehooks.com/](https://usehooks.com/)
* [https://overreacted.io/why-do-hooks-rely-on-call-order/](https://overreacted.io/why-do-hooks-rely-on-call-order/)

---

✅ Cleaned, structured, and course-aligned ✨
