import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { rems } from '../constants/tokens'

interface InputProps {
    value: string;
    placeholder: string;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void | '')
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
    return (
        <InputField
            tabIndex={0}
            placeholder={placeholder}
            aria-atomic="true"
            aria-label='add task'
            value={value} onChange={onChange}
            type="text"
            required
        />

    )
}


export const InputField = styled.input`
        background: transparent;
        height: 2rem;
        width: 100%;
        border-radius: 0.25rem;
        border: 1px solid ${props => props.theme.outline};
        color: ${props => props.theme.text};
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding: ${rems[4]};
        &:focus {
            background: ${props => props.theme.hover};
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }

`

export const PrimaryBtn = styled.button`
    font-size: ${rems[16]};
    height: ${rems[32]};
    color: ${props => props.theme.text};
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: ${rems[4]};
    background: transparent;
    &:hover {
        background: ${props => props.theme.btnHover};
    }
    &:focus{
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }
`;


export const SecondaryBtn = styled.button`
    font-size: ${rems[14]};
    border-radius: ${rems[4]};
    color: ${props => props.theme.textSecond};
    border: none;
    background: transparent;
    height: ${rems[32]};
    &:hover {
        background: ${props => props.theme.btnHover};
    }
    &:focus{
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }
`;

