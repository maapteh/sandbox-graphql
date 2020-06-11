import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Covid } from '../modules/covid/covid';

const IndexPage: NextPage = () => {
    return (
        <>
            <Covid />
        </>
    );
};

export default withApollo(IndexPage);
