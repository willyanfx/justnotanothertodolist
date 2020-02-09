import React from 'react';
import styled from 'styled-components';

export const Checkbox = () => {
    return (
        <div>
            <Check />
        </div>
    );
};

const Check = styled.span`
    cursor: pointer;
    border-color: gray;
    color: #343434;
    height: 16px;
    width: 16px;
    display: block;
    border: 1px solid gray;
    border-radius: 16px;
`;
