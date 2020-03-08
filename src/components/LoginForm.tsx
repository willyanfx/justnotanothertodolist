import React, { useState, useRef } from 'react';
import VisuallyHidden from './VisuallyHidden';
import { login } from '../helpers';

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
                <div>
                    <p>Oops, there was an error logging you in.</p>
                    <p>
                        <i>{error.message}</i>
                    </p>
                </div>
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

                <div>
                    <label>
                        <input
                            data-todo-input
                            type='checkbox'
                            onChange={handleShowPassword}
                            checked={showPassword}
                        />
                        Show password
                    </label>
                </div>

                <button data-todo-button>
                    <span>{loading ? 'Loading...' : 'Login'}</span>
                </button>
            </form>
        </div>
    );
}
