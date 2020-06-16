import { NextPage } from 'next';
import { withApollo } from '../lib/apollo';
import { ListOverview } from '../modules/list/list-overview';

const ListsPage: NextPage = () => {
    return <ListOverview />;
};

export default withApollo(ListsPage);
