# Sandbox

> Workshop

## Pre-requisites

-   `yarn`, with node10 or node12
-   editor plugins: [vscode prisma graphql plugin](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql), or [jetbrains](https://plugins.jetbrains.com/plugin/8097-js-graphql) (optional)

## File structure

-   [graphql server](./pages/api/graphql/index.ts) with resolver and schema
-   [page](./pages/index.tsx)
-   [simple component](./modules/simple/simple.tsx)
-   [apollo client](./lib/apollo.tsx)

## Development

-   `yarn dev` (optional: after it run in other proces `yarn test:watch`)
-   goto [http://localhost:3007/](http://localhost:3007/) (playground at [http://localhost:3007/api/graphql](http://localhost:3007/api/graphql))

_In the future when you want to have the possibility to run on https for your frontend part (or having hsts problems) you can run `yarn dev:secure`, then the app is available at https://localhost for this assignments it is not needes we will only connect with https on the server part._


## Workshop

[here](./internals/wiki/index.md)
