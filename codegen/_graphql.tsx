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

/**
 * Historical Covid data for countries
 * 
 * A better solution for this excersise would be the following:
 * 
 * query covidHistorical: [covidHistorical!] where covidHistorical would be:
 * 
 * date: String (Bonus when you used custom Date scalar, for strictly typing!)
 * countries: [covidHistoricalCountry!]!
 * 
 * covidHistoricalCountry:
 * code: CountryCode!, province: String, cases: Int!, death: Int!, recovered: Int!
 * 
 * Just proceed with one of these two, to the bonus questions to find out why the
 * better solution above works better :) Playing, moving, shifting is what
 * schematising is all about. Your output model is very important, more then you
 * are used to in Rest where you just build it based on one scenario and just add
 * more fields later on. Untill there are so many fields and you dont know what is what anymore.
 * 
 * Advise: dont't rush things, never take your resources naming always as is
 */
export type CovidHistorical = {
  __typename?: 'CovidHistorical';
  /** The last ten days */
  dates: Array<Scalars['String']>;
  /** The Covid results for the countries */
  results: Array<CovidTimelineCountry>;
};

/** Covid results per country showing cases, deaths and recoverd */
export type CovidTimelineCountry = {
  __typename?: 'CovidTimelineCountry';
  /** Country name */
  country: Scalars['String'];
  /** Province */
  province: Maybe<Scalars['String']>;
  /** Known amount of Covid cases */
  cases: Array<Scalars['Int']>;
  /** Known amount of Covid deaths */
  deaths: Array<Scalars['Int']>;
  /** Known amount of Covid reciveries */
  recovered: Array<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** Have a simple example */
  simple: Maybe<Scalars['String']>;
  /** Get historical data of all countries */
  covidHistorical: Maybe<CovidHistorical>;
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