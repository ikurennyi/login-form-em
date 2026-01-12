# Login Form

> Created as a test task by Ievgenii Kurennyi
>
> This project was created as a test assignment aka "Create Login Form"

## Table of Contents

1. [Application Notes](#application-notes)
2. [Where to view](#where-to-view)
3. [List of Used Technologies](#list-of-used-technologies)
4. [Personal Notes for those who would have time to read](#personal-notes-for-those-who-would-have-time-to-read)

### <a id="application-notes">Application Notes</a>

1. When writing this code, the focus was on the form itself rather than on the choice of framework or the setup of the development environment.
2. Vue 3 was chosen to build the form because the author is currently working with Vue (v2).
3. The login form is accessible via keyboard navigation.
4. To manage the form state, the author used their own (slightly improved) composable that had been written earlier [here](https://github.com/ikurennyi/tasks-management/commit/b67f7c9f84497337cac1c260dad928c8533dbea3#diff-305b44060d9f77f7eb09b613ce677d40cd0c79b9d532ac1368fcfe204ddd84eb).
5. Two new composables were written to handle form validation and control state in addition to the `useForm`.
6. The tests cover the basic functionality.
7. Prettier and ESLint were used without pre-commit hooks.
8. The author did not aim to build a full-fledged application; a number of simplifications were intentionally made.

### <a id="where-to-view">Where to view</a>

1. The live preview is available on [GitHub Pages](https://ikurennyi.github.io/login-form-em/).
2. You can run the code locally: please install dependencies and run `npm run dev` in your terminal.
3. You can check the code here at GitHub repository [login-form-em](https://github.com/ikurennyi/login-form-em).

### <a id="list-of-used-technologies">List of Used Technologies</a>

1. [Vue.js](https://vuejs.org/)
2. [Vitest](https://vitest.dev)
3. [Vite](https://vite.dev/)
4. [TypeScript](https://www.typescriptlang.org/)
5. [ESLint](https://eslint.org/)
6. [Prettier](https://prettier.io/)

### <a id="personal-notes-for-those-who-would-have-time-to-read">Personal Notes for those who would have time to read</a>

1. No need to create extra files for types and interfaces in such a tiny project.
2. `oxlint` added for test purpose only.
3. And as always: "there is no limit to perfection".
