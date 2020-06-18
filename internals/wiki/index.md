# GraphQL Workshop Tutorial

Welcome to the tutorial accompanying the GraphQL workshop. This purpose of this tutorial is to get you up and running with GraphQL andnd to introduce the most important concepts of using GraphQL.

There are 3 parts to this tutorial:

-   Fundamentals: Chapters with assignments to step-by-step build a GraphQL api and web application, including solutions
-   Testing: Explains 3 possible testing strategies
-   Final Project: A final assignment to build a SpaceX application, including solutions

To get the most out of this workshop we recommend solving the assignments on your own, and using the solutions as comparison or if you're really stuck . The workshop presentation together with the information in the chapters contain everything you need to solve the assignments.

Some programming experience in C-style languages (JS, TS, Java, etc.) is required. In this tutorial we use TypesScript, we try to explain the syntax and keep it simple as we go along. But you might have to lookup a TypeScript API if certain code looks unfamiliar.

If you get stuck or can't solve an assignment, we still encourage you to follow along and learn about GraphQL by reviewing the chapter solutions.

## Pre-requisties

You should already have the following:

-   Installed [NodeJS 10 or 12](https://nodejs.org/en/download/)
-   Installed [Yarn](https://classic.yarnpkg.com/lang/en/)
-   Access to [BitBucket](https://scm.ecom.ahold.nl/stash/users/maarten.van.oudenniel/repos/sandbox-graphql/browse)

## Contents

-   [Setting up your development environment](./00-development-environment.md)
-   [More information about this codebase and the GraphQL setup](./setup/index.md)

### Fundamentals

A step-by-step or standalone guide to build a GraphQL API and web application. It's possible to start at any chapter. Each chapter contains assignments that are free to implement however you'd like. As a more guided track you can follow the solutions where we build a favorites list app.

You can also start with the projects and use the fundamentals guide as a reference. Chapter 4 is a project to build a Covid tracking application, and in the final project we build a SpaceX application.

1. [My first query](./01-my-first-query.md)  
   [Frontend, Backend]  
   Writing our first query using GraphQL

2. [Calling GraphQL from React](./02-calling-graphql-from-react.md)  
   [Frontend]  
   Consuming our GraphQL API from React

3. [Server Side Rendering](./03-server-side-rendering.md)  
   [Frontend]  
   Configuring Server Side Rendering

4. [Project - Covid App](./04-covid-app.md)  
   [Frontend, Backend]  
   Real world example of connecting to a service to build a covid app

5. [Paging](./05-paging.md)  
   [Frontend, Backend]  
   Implement paging

6. [Lazy Queries](./06-lazy-queries.md)  
   [Frontend]  
   Conditionally call GraphQL

7. [Mutations](./07-mutations.md)  
   [Frontend, Backend]  
   Modifying and updating data

8. [Fragments](./08-fragments.md)  
   [Frontend]  
   Re-usable components using Fragments

9. [Union Types](./09-union-types.md)  
   [Frontend, Backend]  
   How to use union types

10. [Dataloader](./10-dataloader.md)  
    [Backend]  
    Make your API efficient #TODO

11. [Advanced GraphQL](./11-advanced-graphql.md)  
    [Frontend, Backend]  
    Caching, Input types, interfaces, scalars, optimistic responses

### Testing

There are 3 parts to testing GraphQL. In these chapters we take a close look at all the strategies.

12. [Unit Testing Client Side](./12-unit-testing-client-side.md)  
    [Frontend, Test]  
    How to unit test GraphQL powered components

13. [Unit Testing Server Side](./13-unit-testing-server-side.md)  
    [Backend, Test]  
    How to unit test GraphQL API's

14. [Integration Testing](./14-integration-testing.md)  
    [Test]  
    How to run integration tests on GraphQL API's

### Final Project

15. [SpaceX App](./15-spacex-app.md)  
    [Frontend, Backend]  
    In this project we build an app using the SpaceX API.
