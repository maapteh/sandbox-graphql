import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionResults from '../codegen/_generated-fragment-types';

export const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResults,
});
