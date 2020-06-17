import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  items?: Maybe<Array<ListItem>>;
};

/** Item contained in list */
export type ListItem = ListItemProduct | ListItemRecipe;

export type ListItemProduct = {
  __typename?: 'ListItemProduct';
  /** Id of product */
  id: Scalars['Int'];
  product?: Maybe<Product>;
  /** Amount of items in list */
  quantity: Scalars['Int'];
};

export type ListItemRecipe = {
  __typename?: 'ListItemRecipe';
  /** Id of recipe */
  id: Scalars['Int'];
  /** Title of recipe */
  title: Scalars['String'];
  /** Description of recipe */
  description: Scalars['String'];
  /** Amount of items in list */
  quantity: Scalars['Int'];
};

/** Paged result of lists query */
export type ListsResult = {
  __typename?: 'ListsResult';
  /** Paged collection */
  result?: Maybe<Array<List>>;
  /** Total amount of items in collection */
  total: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  listRename?: Maybe<List>;
};


export type MutationListRenameArgs = {
  id: Scalars['Int'];
  description: Scalars['String'];
};

/** A sellable product */
export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  description: Scalars['String'];
  thumbnail: Scalars['String'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  /** Have a simple example */
  simple?: Maybe<Scalars['String']>;
  /** Get all the favorite lists this user has made */
  lists?: Maybe<ListsResult>;
  /** Get list by id */
  list?: Maybe<List>;
  /** Get a single product */
  product?: Maybe<Product>;
};


export type QueryListsArgs = {
  start: Scalars['Int'];
  size?: Maybe<Scalars['Int']>;
};


export type QueryListArgs = {
  id: Scalars['Int'];
};


export type QueryProductArgs = {
  id: Scalars['Int'];
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
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ListsResult: ResolverTypeWrapper<ListsResult>;
  List: ResolverTypeWrapper<Omit<List, 'items'> & { items?: Maybe<Array<ResolversTypes['ListItem']>> }>;
  ListItem: ResolversTypes['ListItemProduct'] | ResolversTypes['ListItemRecipe'];
  ListItemProduct: ResolverTypeWrapper<ListItemProduct>;
  Product: ResolverTypeWrapper<Product>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ListItemRecipe: ResolverTypeWrapper<ListItemRecipe>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  ListsResult: ListsResult;
  List: Omit<List, 'items'> & { items?: Maybe<Array<ResolversParentTypes['ListItem']>> };
  ListItem: ResolversParentTypes['ListItemProduct'] | ResolversParentTypes['ListItemRecipe'];
  ListItemProduct: ListItemProduct;
  Product: Product;
  Float: Scalars['Float'];
  ListItemRecipe: ListItemRecipe;
  Mutation: {};
  Boolean: Scalars['Boolean'];
};

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['ListItem']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ListItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListItem'] = ResolversParentTypes['ListItem']> = {
  __resolveType: TypeResolveFn<'ListItemProduct' | 'ListItemRecipe', ParentType, ContextType>;
};

export type ListItemProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListItemProduct'] = ResolversParentTypes['ListItemProduct']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ListItemRecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListItemRecipe'] = ResolversParentTypes['ListItemRecipe']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ListsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListsResult'] = ResolversParentTypes['ListsResult']> = {
  result?: Resolver<Maybe<Array<ResolversTypes['List']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  listRename?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationListRenameArgs, 'id' | 'description'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  simple?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lists?: Resolver<Maybe<ResolversTypes['ListsResult']>, ParentType, ContextType, RequireFields<QueryListsArgs, 'start'>>;
  list?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryListArgs, 'id'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  List?: ListResolvers<ContextType>;
  ListItem?: ListItemResolvers;
  ListItemProduct?: ListItemProductResolvers<ContextType>;
  ListItemRecipe?: ListItemRecipeResolvers<ContextType>;
  ListsResult?: ListsResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
