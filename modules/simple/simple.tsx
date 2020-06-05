import React from 'react';
import styled from 'styled-components';
import { Plain } from '../../components/plain/plain';
import { useSimpleQuery } from '../../codegen/_graphql';

const TitleSimple = styled.h1`
    color: #00ade6;
    font-size: 24px;
`;

type Props = {
    ssr?: boolean;
};

export const Simple = ({ ssr = true }: Props) => {
    console.log('[client] render good');
    const { data } = useSimpleQuery({
        ssr,
    });

    return (
        <Plain>
            <TitleSimple>Simple</TitleSimple>
            <p>{data && data.simple}</p>
        </Plain>
    );
};
