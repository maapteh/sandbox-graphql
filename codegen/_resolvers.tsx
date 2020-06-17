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
  simple?: Maybe<Scalars['String']>;
  /** Show all spacex ships */
  spacexShips?: Maybe<Array<SpacexShip>>;
};

/** Launch information */
export type SpacexLaunch = {
  __typename?: 'SpacexLaunch';
  /** Launch identification */
  id: Scalars['ID'];
  /** Collection of image urls */
  images?: Maybe<Array<Scalars['String']>>;
};

/** Spacex ship */
export type SpacexShip = {
  __typename?: 'SpacexShip';
  /** Identification string of the space ship */
  id: Scalars['ID'];
  /** Basic ship information */
  info?: Maybe<SpacexShipInfo>;
};

/** Ship information */
export type SpacexShipInfo = {
  __typename?: 'SpacexShipInfo';
  /** Ship type, can also be enum now kept as string for simplicity */
  type: Scalars['String'];
  /** Image url with the space ship */
  image: Scalars['String'];
  /** Launches this ship did */
  launches?: Maybe<Array<SpacexLaunch>>;
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
  SpacexShip: ResolverTypeWrapper<SpacexShip>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  SpacexShipInfo: ResolverTypeWrapper<SpacexShipInfo>;
  SpacexLaunch: ResolverTypeWrapper<SpacexLaunch>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CacheControlScope: CacheControlScope;
  Int: ResolverTypeWrapper<Scalars['Int']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  SpacexShip: SpacexShip;
  ID: Scalars['ID'];
  SpacexShipInfo: SpacexShipInfo;
  SpacexLaunch: SpacexLaunch;
  Boolean: Scalars['Boolean'];
  CacheControlScope: CacheControlScope;
  Int: Scalars['Int'];
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  simple?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spacexShips?: Resolver<Maybe<Array<ResolversTypes['SpacexShip']>>, ParentType, ContextType>;
};

export type SpacexLaunchResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpacexLaunch'] = ResolversParentTypes['SpacexLaunch']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SpacexShipResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpacexShip'] = ResolversParentTypes['SpacexShip']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['SpacexShipInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SpacexShipInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpacexShipInfo'] = ResolversParentTypes['SpacexShipInfo']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  launches?: Resolver<Maybe<Array<ResolversTypes['SpacexLaunch']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  SpacexLaunch?: SpacexLaunchResolvers<ContextType>;
  SpacexShip?: SpacexShipResolvers<ContextType>;
  SpacexShipInfo?: SpacexShipInfoResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;