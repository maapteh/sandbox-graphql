import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Favorite list */
export type List = {
  __typename?: 'List';
  /** Description entered by user */
  description: Scalars['String'];
  /** Id of list */
  id: Scalars['Int'];
  /** Items contained in list */
  items: Maybe<Array<ListItem>>;
};

/** Item contained in list */
export type ListItem = {
  __typename?: 'ListItem';
  /** Id of list item */
  id: Maybe<Scalars['Int']>;
  /** Description of list item */
  description: Maybe<Scalars['String']>;
  /** Amount of list items */
  quantity: Scalars['Int'];
};

/** Paged result of lists query */
export type ListsResult = {
  __typename?: 'ListsResult';
  /** Paged collection */
  result: Maybe<Array<List>>;
  /** Total amount of items in collection */
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Have a simple example */
  simple: Maybe<Scalars['String']>;
  /** Get all the favorite lists this user has made */
  lists: Maybe<ListsResult>;
  /** Get list by id */
  list: Maybe<List>;
};


export type QueryListsArgs = {
  start: Scalars['Int'];
  size: Maybe<Scalars['Int']>;
};


export type QueryListArgs = {
  id: Scalars['Int'];
};

export type ListItemsQueryVariables = {
  id: Scalars['Int'];
};


export type ListItemsQuery = (
  { __typename?: 'Query' }
  & { list: Maybe<(
    { __typename?: 'List' }
    & { items: Maybe<Array<(
      { __typename?: 'ListItem' }
      & Pick<ListItem, 'id' | 'description' | 'quantity'>
    )>> }
  )> }
);

export type ListsQueryVariables = {
  start: Scalars['Int'];
  size: Maybe<Scalars['Int']>;
};


export type ListsQuery = (
  { __typename?: 'Query' }
  & { lists: Maybe<(
    { __typename?: 'ListsResult' }
    & Pick<ListsResult, 'total'>
    & { result: Maybe<Array<(
      { __typename?: 'List' }
      & Pick<List, 'id' | 'description'>
    )>> }
  )> }
);

export type SimpleQueryVariables = {};


export type SimpleQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'simple'>
);


export const ListItemsDocument = gql`
    query listItems($id: Int!) {
  list(id: $id) {
    items {
      id
      description
      quantity
    }
  }
}
    `;
export type ListItemsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListItemsQuery, ListItemsQueryVariables>, 'query'> & ({ variables: ListItemsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ListItemsComponent = (props: ListItemsComponentProps) => (
      <ApolloReactComponents.Query<ListItemsQuery, ListItemsQueryVariables> query={ListItemsDocument} {...props} />
    );
    
export type ListItemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ListItemsQuery, ListItemsQueryVariables>
    } & TChildProps;
export function withListItems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ListItemsQuery,
  ListItemsQueryVariables,
  ListItemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ListItemsQuery, ListItemsQueryVariables, ListItemsProps<TChildProps, TDataName>>(ListItemsDocument, {
      alias: 'listItems',
      ...operationOptions
    });
};

/**
 * __useListItemsQuery__
 *
 * To run a query within a React component, call `useListItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListItemsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListItemsQuery, ListItemsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListItemsQuery, ListItemsQueryVariables>(ListItemsDocument, baseOptions);
      }
export function useListItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListItemsQuery, ListItemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListItemsQuery, ListItemsQueryVariables>(ListItemsDocument, baseOptions);
        }
export type ListItemsQueryHookResult = ReturnType<typeof useListItemsQuery>;
export type ListItemsLazyQueryHookResult = ReturnType<typeof useListItemsLazyQuery>;
export type ListItemsQueryResult = ApolloReactCommon.QueryResult<ListItemsQuery, ListItemsQueryVariables>;
export const ListsDocument = gql`
    query lists($start: Int!, $size: Int) {
  lists(start: $start, size: $size) {
    result {
      id
      description
    }
    total
  }
}
    `;
export type ListsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ListsQuery, ListsQueryVariables>, 'query'> & ({ variables: ListsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ListsComponent = (props: ListsComponentProps) => (
      <ApolloReactComponents.Query<ListsQuery, ListsQueryVariables> query={ListsDocument} {...props} />
    );
    
export type ListsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ListsQuery, ListsQueryVariables>
    } & TChildProps;
export function withLists<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ListsQuery,
  ListsQueryVariables,
  ListsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ListsQuery, ListsQueryVariables, ListsProps<TChildProps, TDataName>>(ListsDocument, {
      alias: 'lists',
      ...operationOptions
    });
};

/**
 * __useListsQuery__
 *
 * To run a query within a React component, call `useListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListsQuery({
 *   variables: {
 *      start: // value for 'start'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useListsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ListsQuery, ListsQueryVariables>) {
        return ApolloReactHooks.useQuery<ListsQuery, ListsQueryVariables>(ListsDocument, baseOptions);
      }
export function useListsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListsQuery, ListsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ListsQuery, ListsQueryVariables>(ListsDocument, baseOptions);
        }
export type ListsQueryHookResult = ReturnType<typeof useListsQuery>;
export type ListsLazyQueryHookResult = ReturnType<typeof useListsLazyQuery>;
export type ListsQueryResult = ApolloReactCommon.QueryResult<ListsQuery, ListsQueryVariables>;
export const SimpleDocument = gql`
    query simple {
  simple
}
    `;
export type SimpleComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SimpleQuery, SimpleQueryVariables>, 'query'>;

    export const SimpleComponent = (props: SimpleComponentProps) => (
      <ApolloReactComponents.Query<SimpleQuery, SimpleQueryVariables> query={SimpleDocument} {...props} />
    );
    
export type SimpleProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SimpleQuery, SimpleQueryVariables>
    } & TChildProps;
export function withSimple<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SimpleQuery,
  SimpleQueryVariables,
  SimpleProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SimpleQuery, SimpleQueryVariables, SimpleProps<TChildProps, TDataName>>(SimpleDocument, {
      alias: 'simple',
      ...operationOptions
    });
};

/**
 * __useSimpleQuery__
 *
 * To run a query within a React component, call `useSimpleQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimpleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SimpleQuery, SimpleQueryVariables>) {
        return ApolloReactHooks.useQuery<SimpleQuery, SimpleQueryVariables>(SimpleDocument, baseOptions);
      }
export function useSimpleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SimpleQuery, SimpleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SimpleQuery, SimpleQueryVariables>(SimpleDocument, baseOptions);
        }
export type SimpleQueryHookResult = ReturnType<typeof useSimpleQuery>;
export type SimpleLazyQueryHookResult = ReturnType<typeof useSimpleLazyQuery>;
export type SimpleQueryResult = ApolloReactCommon.QueryResult<SimpleQuery, SimpleQueryVariables>;