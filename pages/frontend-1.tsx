import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Lists } from '../modules/frontend-1/lists';

const Frontend1Page: NextPage = () => {
    return <Lists />;
};

export default withApollo(Frontend1Page);
