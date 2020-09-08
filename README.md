# sapper-tailwind-template

The default [Sapper template](https://github.com/sveltejs/sapper-template) (Rollup version) configured for Tailwind and Purgecss. More info at [Sapper](https://sapper.svelte.dev/) and [tailwind examples](https://github.com/tailwindcss/setup-examples/tree/master/examples/sapper)

## How to use

### Using `degit`
[degit](https://github.com/Rich-Harris/degit) is a scaffolding tool that lets you create a directory from a branch in a repository.
```bash
npx degit "bluheart/sapper-tailwind-template" my-app
```

## Setup

```bash
cd my-app
npm install # or yarn
```
### Running in development mode
Run these commands in a seperate window
```bash
npm run watch:tailwind
```
```bash
npm run dev
```
### Production mode
```bash
npm run build
npm start
```
