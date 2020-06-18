# Setting up your development environment

Make sure you have installed [NodeJS 10 or 12](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/lang/en/). And that you can run the following commands from your terminal:

```sh
yarn -v
node -v
```

You can use your own code editor. The most used ones are:

-   [VSCode](https://code.visualstudio.com/)
-   [WebStorm](https://www.jetbrains.com/webstorm/download/#section=windows) (paid with 30-day trial)

Both also have GraphQL plugins that you can use. For these tutorial these are optional:

-   [VSCode plugin](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql)
-   [WebStorm plugin](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql).

Next clone the repository

```sh
git clone https://@scm.ecom.ahold.nl/stash/scm/~maarten.van.oudenniel/sandbox-graphql.git
```

Install all dependencies using yarn

```sh
yarn
```

Now we can run the application

```
yarn dev
```
