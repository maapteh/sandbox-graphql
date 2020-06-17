import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Spacex } from '../modules/spacex/spacex';

const IndexPage: NextPage = () => {
    return (
        <>
            <Spacex />
        </>
    );
};

export default withApollo(IndexPage);
