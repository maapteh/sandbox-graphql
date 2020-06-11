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

/** Historical Covid data for countries */
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
  /** Known total amount of Covid cases */
  cases: Array<Scalars['Int']>;
  /** Known total amount of Covid deaths */
  deaths: Array<Scalars['Int']>;
  /** Known total amount of Covid reciveries */
  recovered: Array<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  /** Have a simple example */
  simple: Maybe<Scalars['String']>;
  /** Get historical data of all countries */
  covidHistorical: Maybe<CovidHistorical>;
};


export type QueryCovidHistoricalArgs = {
  days: Maybe<Scalars['Int']>;
  country: Maybe<Scalars['String']>;
};

export type CovidHistoricalQueryVariables = {
  days: Maybe<Scalars['Int']>;
  country: Maybe<Scalars['String']>;
};


export type CovidHistoricalQuery = (
  { __typename?: 'Query' }
  & { covidHistorical: Maybe<(
    { __typename?: 'CovidHistorical' }
    & Pick<CovidHistorical, 'dates'>
    & { results: Array<(
      { __typename?: 'CovidTimelineCountry' }
      & Pick<CovidTimelineCountry, 'province' | 'deaths' | 'recovered'>
    )> }
  )> }
);

export type SimpleQueryVariables = {};


export type SimpleQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'simple'>
);


export const CovidHistoricalDocument = gql`
    query covidHistorical($days: Int, $country: String) {
  covidHistorical(days: $days, country: $country) {
    dates
    results {
      province
      deaths
      recovered
    }
  }
}
    `;
export type CovidHistoricalComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<CovidHistoricalQuery, CovidHistoricalQueryVariables>, 'query'>;

    export const CovidHistoricalComponent = (props: CovidHistoricalComponentProps) => (
      <ApolloReactComponents.Query<CovidHistoricalQuery, CovidHistoricalQueryVariables> query={CovidHistoricalDocument} {...props} />
    );
    
export type CovidHistoricalProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<CovidHistoricalQuery, CovidHistoricalQueryVariables>
    } & TChildProps;
export function withCovidHistorical<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CovidHistoricalQuery,
  CovidHistoricalQueryVariables,
  CovidHistoricalProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, CovidHistoricalQuery, CovidHistoricalQueryVariables, CovidHistoricalProps<TChildProps, TDataName>>(CovidHistoricalDocument, {
      alias: 'covidHistorical',
      ...operationOptions
    });
};

/**
 * __useCovidHistoricalQuery__
 *
 * To run a query within a React component, call `useCovidHistoricalQuery` and pass it any options that fit your needs.
 * When your component renders, `useCovidHistoricalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCovidHistoricalQuery({
 *   variables: {
 *      days: // value for 'days'
 *      country: // value for 'country'
 *   },
 * });
 */
export function useCovidHistoricalQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CovidHistoricalQuery, CovidHistoricalQueryVariables>) {
        return ApolloReactHooks.useQuery<CovidHistoricalQuery, CovidHistoricalQueryVariables>(CovidHistoricalDocument, baseOptions);
      }
export function useCovidHistoricalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CovidHistoricalQuery, CovidHistoricalQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CovidHistoricalQuery, CovidHistoricalQueryVariables>(CovidHistoricalDocument, baseOptions);
        }
export type CovidHistoricalQueryHookResult = ReturnType<typeof useCovidHistoricalQuery>;
export type CovidHistoricalLazyQueryHookResult = ReturnType<typeof useCovidHistoricalLazyQuery>;
export type CovidHistoricalQueryResult = ApolloReactCommon.QueryResult<CovidHistoricalQuery, CovidHistoricalQueryVariables>;
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