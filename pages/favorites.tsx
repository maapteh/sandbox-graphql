import { NextPage } from 'next';
import styled from 'styled-components';
import { withApollo } from '../lib/apollo';
import { ListOverview } from '../modules/list/list-overview';
import { ProductList } from '../modules/product/product-list';

const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const Half = styled.div`
    width: 49%;
`;

const ListsPage: NextPage = () => {
    return (
        <Container>
            <Half>
                <h2>My Favorite Lists</h2>
                <ListOverview />
            </Half>
            <Half>
                <h2>Products</h2>
                <ProductList />
            </Half>
        </Container>
    );
};

export default withApollo(ListsPage);
