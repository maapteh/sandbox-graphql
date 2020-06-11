import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { Covid } from '../modules/covid/covid';
import { CovidVisual } from '../modules/covid/covid-visual';

const IndexPage: NextPage = () => {
    return (
        <>
            <h1>Corona</h1>
            {/* You can display it visually or just simple, both solutions are here */}
            {/* <Covid /> */}
            <CovidVisual />
        </>
    );
};

export default withApollo(IndexPage);
