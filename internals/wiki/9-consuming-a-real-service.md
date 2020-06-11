## Chapter 9 - Consuming a real service

> Backend | Frontend

For this exercise we are going to look at the open api of https://disease.sh/docs/#/JHUCSSE/get_v2_historical

With endpoint: `https://disease.sh/v2/historical?lastdays=10`

### 9.1 Assignment: Figure out what this endpoint provides

First we look in the swagger at Responses where you can find the schema/model it provides:

```
{
  "country": "string",
  "province": "string"
}
```

Then we call the service by clicking 'Try it out'. Huh Wait there is more information then in the schema?
This actually happens a lot with services and no attention to their output annotation. So this stops us from using their generated swagger output and autogenerate the types automatically. Without these types its more difficult to normalize and see changes.

After some tries we find out what the real interface is. Use that information and create your own schema out of it. Keep in mind which are optional fields and which one are required (always have information). It would be much easier when it comes from the service, agree? Thats life.

Make sure you have our application running.

This schema is important to think about, since you will find out you can't take it as is (graphql doesnt have dynamic keys/fields).

Now place this schema in `./pages/graphql/schema.ts` and expose it via the query name 'covidHistorical' under the Query part where you find 'simple'.

### 9.2 Assignment: Now expose the data in the form you schematised

Almost there, now we have to fetch the actual data and resolve this. Add the 'covidHistorical' resolver in `./pages/graphql/resolver.ts` and fetch the async data and now normalise this data so it matches your schema!

```js
const response = await fetch('https://disease.sh/v2/historical?lastdays=10');
```

Its time to code, and at same time maybe look at http://localhost:3000/api/graphql to debug on the fly. Its also possible to run the app in debug mode `yarn dev:inspect`.

After you exposed the data, you will find out that not every field is how you expected it to be. Also it happens that after exposing the data the schema you defined may not be so smart (for example repetition of data). So its common you adjust in this phase. It also happens when exposing more then one consumer. Think more, less problems on the long run.

When you are done, run `yarn schema:linter`

### 9.3 Bonus assignments

1. We exposed historical data of ten last days, make the days configurable from the query
2. We exposed all historical data, now make it optional to filter for a specific country.
3. We created an endpoint now display the information, frontend is easy when the data is typed :)
