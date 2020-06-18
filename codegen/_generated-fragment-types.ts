
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "ListItem",
        "possibleTypes": [
          {
            "name": "ListItemProduct"
          },
          {
            "name": "ListItemRecipe"
          }
        ]
      }
    ]
  }
};
      export default result;
    