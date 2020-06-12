import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
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
  province?: Maybe<Scalars['String']>;
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
  simple?: Maybe<Scalars['String']>;
  /** Get historical data of all countries */
  covidHistorical?: Maybe<CovidHistorical>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CovidHistorical: ResolverTypeWrapper<CovidHistorical>;
  CovidTimelineCountry: ResolverTypeWrapper<CovidTimelineCountry>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  CovidHistorical: CovidHistorical;
  CovidTimelineCountry: CovidTimelineCountry;
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
};

export type CovidHistoricalResolvers<ContextType = any, ParentType extends ResolversParentTypes['CovidHistorical'] = ResolversParentTypes['CovidHistorical']> = {
  dates?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['CovidTimelineCountry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CovidTimelineCountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CovidTimelineCountry'] = ResolversParentTypes['CovidTimelineCountry']> = {
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cases?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  deaths?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  recovered?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  simple?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  covidHistorical?: Resolver<Maybe<ResolversTypes['CovidHistorical']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CovidHistorical?: CovidHistoricalResolvers<ContextType>;
  CovidTimelineCountry?: CovidTimelineCountryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
