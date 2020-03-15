import React, { useRef, useState, forwardRef } from 'react';

import styled from 'styled-components';
import { AddTask } from './AddTask';
import { useTransition, animated } from 'react-spring';
import { IoMdClose } from 'react-icons/io';
import { rems } from '../constants/tokens';



const DialogContent: React.FC<{
    style?: {
        transform: any;
    }
}> = (props) => <Dialog {...props}>{props.children}</Dialog>;

const DialogOverlay = forwardRef<HTMLDivElement, DialogProps>(
    function DialogOverlay({ isOpen = true, ...props }, forwardRef) {

        return isOpen ? (
            <DialogOverlayDiv ref={forwardRef}>{props.children}</DialogOverlayDiv>
        ) : null;
    }
);


function AddDialog({ isOpen = false, onDismiss }: DialogProps): JSX.Element | null {

    const transitions = useTransition(isOpen, null, {
        config: { duration: 110 },
        from: { opacity: 0, transform: 'translateY(-10px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(-10px)' }
    })


    return (<>
        {transitions.map(({ item, key, props: { opacity, transform } }) => item
            && <DialogOverlay style={{ opacity }}
                isOpen={item}
                key={key}>
                {item && console.log(typeof transform)}
                <DialogContent style={{ transform }}>
                    <Header>
                        <h2 className='header'>Quick Add Task</h2>
                        <ButtonClose
                            className='add-task__cancel-x'
                            aria-label='Cancel adding task'
                            onClick={onDismiss}

                            tabIndex={0}
                            role='button'>
                            <IoMdClose />
                        </ButtonClose>
                    </Header>
                    <ContainerAddTask>
                        <AddTask />
                    </ContainerAddTask>
                </DialogContent>
            </DialogOverlay>)
        }
    </>)
};

export default AddDialog;

const Header = styled.header`
    width: 100%;
    height: ${rems[40]};
    padding-left: ${rems[16]};
    padding-right: ${rems[16]};
    display: flex;
    align-items: center;
    color: #fff;
    justify-content: space-between;
      h2 {
        font-size: ${rems[20]};
        line-height: ${rems[24]};
    }
`;

const ButtonClose = styled.button`
    width: ${rems[32]};
    height: ${rems[32]};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: transparent;
    border-radius: ${rems[4]};
    border-color: transparent;
    &:hover {
        background: #2e2c31;
    }
`;

const DialogOverlayDiv = styled(animated.div)`
    background: hsla(0, 0%, 0%, 0.33);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    z-index: 30000;
`;

const Dialog = styled(animated.div)`
    width: 40vw;
    margin: 10vh auto;
    background: white;
    outline: none;
    background: #383838;
    box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.2),
        0px 9px 46px rgba(0, 0, 0, 0.12), 0px 24px 38px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    z-index: 99999999;
`;

const ContainerAddTask = styled.div`
    padding: ${rems[4]} ${rems[16]} ${rems[16]};
`;

export type DialogProps = {
    isOpen: boolean;
    onDismiss?: ((event?: React.SyntheticEvent<Element, Event>) => void);
    initialFocusRef?: React.RefObject<any>;
} & React.HTMLAttributes<HTMLDivElement>;
