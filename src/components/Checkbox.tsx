import React from 'react';
import styled from 'styled-components';

export function Checkbox({ onClick }: any): React.ReactElement {
    return (
        <div>
            <CheckboxBtn onClick={onClick} />
        </div>
    );
}

const CheckboxBtn = styled.button`
    cursor: pointer;
    border-color: gray;
    color: #343434;
    height: 16px;
    width: 16px;
    display: block;
    border: 1px solid gray;
    border-radius: 16px;
`;
