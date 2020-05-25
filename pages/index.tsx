import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Simple } from '../modules/simple/simple';

const IndexPage: NextPage = () => {
    return (
        <>
            <Simple />
        </>
    );
};

export default withApollo(IndexPage);
