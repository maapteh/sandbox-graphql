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


/** cache control */
export enum CacheControlScope {
  /** Personal data, based on jwt token and locale (see server.ts) */
  Private = 'PRIVATE',
  /** Public data, non personal */
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  /** Have a simple example */
  simple: Maybe<Scalars['String']>;
  /** Show all spacex ships */
  spacexShips: Maybe<Array<SpacexShip>>;
};

/** Launch information */
export type SpacexLaunch = {
  __typename?: 'SpacexLaunch';
  /** Launch identification */
  id: Maybe<Scalars['ID']>;
  /** Collection of image urls */
  images: Maybe<Array<Scalars['String']>>;
};

/** Spacex ship */
export type SpacexShip = {
  __typename?: 'SpacexShip';
  /** Identification string of the space ship */
  id: Maybe<Scalars['ID']>;
  /** Basic ship information */
  info: Maybe<SpacexShipInfo>;
};

/** Ship information */
export type SpacexShipInfo = {
  __typename?: 'SpacexShipInfo';
  /** Ship type, can also be enum now kept as string for simplicity */
  type: Scalars['String'];
  /** Image url with the space ship */
  image: Scalars['String'];
  /** Launches this ship did */
  launches: Maybe<Array<SpacexLaunch>>;
};

export type SimpleQueryVariables = {};


export type SimpleQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'simple'>
);


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