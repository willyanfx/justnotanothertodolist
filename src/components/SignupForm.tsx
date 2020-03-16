import React, { Fragment, useState } from 'react';
import VisuallyHidden from './VisuallyHidden';
import TabsButton from './TabsButton';
import { signup } from '../helpers';
import styled from 'styled-components';
import { InputField } from '../Styles/styles';
export type TextInputProps = {
    id: string;
    label: string;
    type?: string;
};


function TextInput({ id, label, type = 'text' }: TextInputProps) {
    return (
        <Fragment>
            <VisuallyHidden>
                <label htmlFor={id}>{label}</label>
            </VisuallyHidden>
            <InputField
                data-todo-input
                type={type}
                id={id}
                placeholder={label}
                required
            />
        </Fragment>
    );
}

export default function SignupForm() {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        const [displayName, email, password] = event.target.elements;
        let photoURL = `https://api.adorable.io/avatars/85/${displayName.value}.png`;

        try {
            await signup({
                displayName: displayName.value,
                email: email.value,
                password: password.value,
                photoURL: photoURL
            });
        } catch (error) {
            setLoading(false);
            setError(error);
        }
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
            <Form onSubmit={handleSignup}>
                <TextInput id='displayName' label='Display Name' />
                <TextInput data-todo-input id='email' label='Email' />
                <TextInput id='password' type='password' label='Password' />
                <TabsButton>
                    <i>♦︎</i>
                    <span>{loading ? 'Loading...' : 'Sign Up'}</span>
                </TabsButton>
            </Form>
        </div>
    );
}
const Form = styled.form`
    display: grid;
`;
