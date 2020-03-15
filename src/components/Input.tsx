import React from 'react'
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


const InputField = styled.input`
        background: transparent;
        height: 2rem;
        width: 100%;
        border-radius: 0.25rem;
        border: 1px solid #747474;
        color: #fff;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding: ${rems[4]};
        &:focus {
            background: #292929;
        }

`
