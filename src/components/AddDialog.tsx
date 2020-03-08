import React, { useRef, useState, forwardRef } from 'react';

import styled from 'styled-components';
import { AddTask } from './AddTask';
import { useTransition, animated } from 'react-spring';
import { IoMdClose } from 'react-icons/io';

const DialogContent: React.FC = ({ children }) => <Dialog>{children}</Dialog>;

const DialogOverlay = forwardRef<HTMLDivElement, DialogProps>(
    function DialogOverlay({ isOpen = true, ...props }, forwardRef) {
        return isOpen ? (
            <DialogOverlayDiv>{props.children}</DialogOverlayDiv>
        ) : null;
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

    return (
        props.isOpen && (
            <DialogOverlay>
                <DialogContent>
                    <Header>
                        <h2 className='header'>Quick Add Task</h2>
                        <span
                            className='add-task__cancel-x'
                            aria-label='Cancel adding task'
                            onClick={props.onDismiss}
                            onKeyDown={() => {}}
                            tabIndex={0}
                            role='button'>
                            <IoMdClose />
                        </span>
                    </Header>
                    <div>
                        <AddTask />
                    </div>
                </DialogContent>
            </DialogOverlay>
        )
    );
};

export default AddDialog;

const Header = styled.header`
    width: 100%;
    height: 32px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    color: #fff;
    justify-content: space-between; 
`;

const DialogOverlayDiv = styled.div`
    background: hsla(0, 0%, 0%, 0.33);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    z-index: 30000;
`;

const Dialog = styled.div`
    width: 40vw;
    margin: 10vh auto;
    background: white;
    /* padding: 2rem; */
    outline: none;
    background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.16),
            rgba(255, 255, 255, 0.16)
        ),
        #121212;
    box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.2),
        0px 9px 46px rgba(0, 0, 0, 0.12), 0px 24px 38px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
`;

export type DialogProps = {
    allowPinchZoom?: boolean;

    isOpen?: boolean;

    onDismiss?: (event?: React.SyntheticEvent) => void;

    children?: React.ReactNode;

    initialFocusRef?: React.RefObject<any>;
} & React.HTMLAttributes<HTMLDivElement>;
