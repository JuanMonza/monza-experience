This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## MONZA CITY: destacados y archivo

El catálogo se edita en `src/data/projects.ts`, dentro de `projectCatalog`.

- Para añadir un proyecto terminado, agrega una entrada con un `id` único, sus datos y `featured: false`. Aparecerá en Project Archive y en la ciudad secundaria.
- Para destacar un proyecto, usa `featured: true` y `featuredOrder` (un número menor aparece primero). La avenida tiene un máximo de cinco lugares. Si hay más candidatos, los restantes permanecen en el archivo.
- Las posiciones y las bases se calculan automáticamente. `city.scale` es opcional; sirve para personalizar las dimensiones.
- `buildingVariant: "flagship"` usa la torre con plaza y corona. También están disponibles `operations`, `pets`, `agency`, `memorial`, `corporate`, `data`, `organic` y `legal`.
- `repository` es opcional. La ficha muestra un enlace real cuando existe; no inventa URLs para proyectos sin repositorio conocido.

La promoción es editorial, mediante el catálogo. Todavía no hay un CMS conectado ni detección automática de proyectos terminados.

Validación: `npm run lint`, `npm run build` y `node --test tests/*.test.mjs` (Node 22.18 o posterior).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
