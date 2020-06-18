# Chapter 14: Integration testing

> [Test]
> Continue from any branch

An important part of testing are integration or e2e tests. For our GraphQL API we can define these using Postman or any other HTTP testing tool.

GraphQL queries and mutations are sent to the server as `POST` requests. The body of the request contains the query data:

```json
{
    "query": "query myQuery($id: id) { myQuery { myData } }",
    "variables": { "id": 9001 },
    "operationName": "myQuery"
}
```

This could of course also be a mutation.

To illustrate using `cURL`:

```sh
curl --location --request POST 'http://localhost:3000/api/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{ "query": "query myQuery(\$id: id) { myQuery { myData } }" }'
```

## Assignment 14.1: Implement an integration test

To finish this chapter, implement an integration test using Postman or a tool of your choice. And make an assertion on the returned data that confirms it's performing the query correctly

# Chapter 14 - Solution: Integration testing

Branch `chapter-14-solution`

## Assignment 14.1 - Solution: Implement an integration test

See postman collection in `tests`.
