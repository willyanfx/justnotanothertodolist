import React, { useState, useRef } from 'react';
import VisuallyHidden from './VisuallyHidden';
import { login } from '../helpers';
import styled, { keyframes } from 'styled-components';
import { rems } from '../constants/tokens';
import { Button } from './Buttons';

export default function LoginForm() {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            await login(
                emailRef.current?.value || '',
                passwordRef.current?.value || ''
            );
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const handleShowPassword = (event: {
        target: { checked: React.SetStateAction<boolean> };
    }) => {
        setShowPassword(event.target.checked);
    };

    return (
        <div>
            {error && (
                <Alert>
                    <p>Oops, there was an error logging you in.</p>
                    <p>
                        <i>{error.message}</i>
                    </p>
                </Alert>
            )}
            <form onSubmit={handleLogin}>
                <VisuallyHidden>
                    <label htmlFor='login:email'>Email:</label>
                </VisuallyHidden>
                <input
                    data-todo-input
                    ref={emailRef}
                    type='text'
                    id='login:email'
                    placeholder='you@example.com'
                    required
                />

                <VisuallyHidden>
                    <label htmlFor='login:password'>Password:</label>
                </VisuallyHidden>
                <input
                    data-todo-input
                    ref={passwordRef}
                    id='login:password'
                    required
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                />
                <CheckboxContainer>
                    <input
                        id='showPassword'
                        type='checkbox'
                        checked={showPassword}
                        onClick={() => handleShowPassword}
                    />
                    <label htmlFor='showPassword'>
                        <span>
                            <svg
                                id='check'
                                viewBox='0 0 12 10'
                                width='12px'
                                height='10px'>
                                <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
                            </svg>
                        </span>
                        <span>Show password</span>
                    </label>
                </CheckboxContainer>

                <Button>
                    <span>{loading ? 'Loading...' : 'Login'}</span>
                </Button>
            </form>
        </div>
    );
}

const Alert = styled.div`
    background: rgba(255, 23, 68, 0.12);
    border: 1px solid rgb(255, 23, 68);
    border-radius: ${rems[4]};
    padding: ${rems[4]} ${rems[8]};
    p {
        font-size: ${rems[14]};
    }
`;
const wave = keyframes`
 50% {
    transform: scale(0.9);
  }
`;

const CheckboxContainer = styled.div`
    height: ${rems[32]};
    display: flex;
    align-items: center;
    input {
        position: absolute;
        visibility: hidden;

        &:checked + label span:first-child {
            background: #07f;
            border-color: #07f;
            animation: ${wave} 0.4s ease;
        }

        &:checked + label span:first-child svg {
            stroke-dashoffset: 0;
        }
    }

    label {
        user-select: none;
        cursor: pointer;
        padding: ${rems[8]} 0;
        border-radius: ${rems[4]};
        overflow: hidden;
        transition: all 0.2s ease;

        &:not(:last-child) {
            margin-right: 6px;
        }
        &:hover {
            background: rgba(#0077ff, 0.06);
        }

        span {
            float: left;
            vertical-align: middle;
            transform: translate3d(0, 0, 0);
            &:first-child {
                position: relative;
                width: 18px;
                height: 18px;
                border-radius: 4px;
                transform: scale(1);
                border: 1px solid #cccfdb;
                transition: all 0.2s ease;
                box-shadow: 0 1px 1px rgba(#00104b, 0.05);
                svg {
                    position: absolute;
                    top: 3px;
                    left: 2px;
                    fill: none;
                    stroke: #fff;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: 16px;
                    stroke-dashoffset: 16px;
                    transition: all 0.3s ease;
                    transition-delay: 0.1s;
                    transform: translate3d(0, 0, 0);
                }
            }

            &:last-child {
                padding-left: 8px;
                line-height: 18px;
            }
        }

        &:hover span:first-child {
            border-color: #07f;
        }
    }
`;
