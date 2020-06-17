import React from 'react';
import styled from 'styled-components';
import { Plain } from '../../components/plain/plain';
import { useSpacexShipsQuery } from '../../codegen/_graphql';

const TitleSimple = styled.h1`
    color: #00ade6;
    font-size: 24px;
`;

const Grid = styled.div`
    border-color: #00ade6;
    padding: 10px;
    width: 190px;
    height: 190px;
    float: left;
    text-align: center;
`;

export const Spacex = () => {
    console.log('[client] render spacex');
    const { data } = useSpacexShipsQuery();

    return (
        <Plain>
            <TitleSimple>Spacex ships and their launches involved</TitleSimple>

            <div>
                {data?.spacexShips?.map((ship) => {
                    return (
                        <div key={ship.id} style={{ clear: 'left' }}>
                            {ship.info && (
                                <>
                                    <h3>{ship.info.type}</h3>

                                    <p>
                                        <img
                                            src={ship.info.image}
                                            alt={ship.info.type}
                                            width="240px"
                                        />
                                    </p>

                                    <p>All launches involved:</p>

                                    {ship.info.launches?.map((launch) => {
                                        const image = launch?.images?.[0];
                                        if (image) {
                                            return (
                                                <Grid>
                                                    <img
                                                        src={image}
                                                        alt=""
                                                        style={{
                                                            maxWidth: '190px',
                                                            maxHeight: '190px',
                                                        }}
                                                    />
                                                </Grid>
                                            );
                                        }
                                        return null;
                                    })}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </Plain>
    );
};
