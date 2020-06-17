import React, { useState } from 'react';
import styled from 'styled-components';
import { ListFragment, useListRenameMutation } from '../../codegen/_graphql';
import { ListItems } from './list-items';

const Container = styled.div`
    padding: 8px;
    margin: 0 0 24px;
    border: 1px solid #eee;
`;

const Anchor = styled.a`
    text-decoration: underline;
    cursor: pointer;
    margin-left: 8px;
`;

export const List: React.FC<ListFragment> = ({ id, description }) => {
    const [newDescription, setNewDescription] = useState(description);
    const [selected, setSelected] = useState(false);
    const [rename] = useListRenameMutation();

    return (
        <Container key={id}>
            {!selected && description}
            {selected && (
                <>
                    <input
                        value={newDescription}
                        onChange={(e) => {
                            if (e.target.value) {
                                setNewDescription(e.target.value);
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            rename({
                                variables: {
                                    id,
                                    description: newDescription,
                                },
                            });
                            setNewDescription('');
                            setSelected(false);
                        }}
                    >
                        Save
                    </button>
                    <button onClick={() => setSelected(false)}>Cancel</button>
                </>
            )}
            {!selected && (
                <Anchor
                    onClick={() => {
                        setNewDescription(description);
                        setSelected(true);
                    }}
                >
                    rename
                </Anchor>
            )}
            <ListItems id={id} />
        </Container>
    );
};
