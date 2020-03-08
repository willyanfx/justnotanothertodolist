import React, { useRef, useState, forwardRef } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AddTask } from './AddTask';
import { useTransition, animated } from 'react-spring';

const DialogContent = ({ children }: any) => <div css={dialog}>{children}</div>;

const DialogOverlay = forwardRef<HTMLDivElement, DialogProps>(
    function DialogOverlay({ isOpen = true, ...props }, forwardRef) {
        return isOpen ? <div css={dialogOverlay}>{props.children}</div> : null;
    }
);

const AddDialog = (props: any) => {
    const rootRef = useRef<any>(null);

    const updateRootElement = (item: any, state: any, props: any) => {
        if (item) {
            if (!rootRef.current) {
                rootRef.current = document.getElementById('root')!;
            }
            rootRef.current.style.filter = `blur(${props.blur}px)`;
        }
    };
    console.log(props);

    return (
        props.isOpen && (
            <DialogOverlay>
                <DialogContent>
                    <div css={header}>
                        <h2 className='header'>Quick Add Task</h2>
                        <span
                            className='add-task__cancel-x'
                            aria-label='Cancel adding task'
                            onClick={props.onDismiss}
                            onKeyDown={() => {}}
                            tabIndex={0}
                            role='button'>
                            X
                        </span>
                    </div>
                    <div css={content}>
                        <AddTask />
                    </div>
                </DialogContent>
            </DialogOverlay>
        )
    );
};

export default AddDialog;

const content = css`
    padding: 16px;
`;

const dialogOverlay = css`
    background: hsla(0, 0%, 0%, 0.33);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
`;

const dialog = css`
    width: 40vw;
    margin: 10vh auto;
    background: white;
    /* padding: 2rem; */
    outline: none;
`;
const header = css`
    width: 100%;
    padding: 4px 16px;
    background: lightgray;
    display: flex;
    justify-content: space-between; 
`;

export type DialogProps = {
    allowPinchZoom?: boolean;

    isOpen?: boolean;

    onDismiss?: (event?: React.SyntheticEvent) => void;

    children?: React.ReactNode;

    initialFocusRef?: React.RefObject<any>;
} & React.HTMLAttributes<HTMLDivElement>;
