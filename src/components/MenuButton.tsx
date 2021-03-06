import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { rems } from '../constants/tokens';

import { useTransition, animated } from 'react-spring';

const MenuContext = createContext<any>(null!);

const useMenuContext = () => useContext(MenuContext);

const initialState = {
    isOpen: false
};

type MenuState = {
    isOpen: boolean
}
type MenuAction = {
    type: string,
    payload?: number
}





function reducer(state: MenuState, action: MenuAction) {
    switch (action.type) {
        case 'OPEN_MENU':
            return {
                ...state,
                isOpen: true
            };
        case 'CLOSE_MENU':
            return {
                ...state,
                isOpen: false
            };
        case 'BTN_SIZE':
            return {
                ...state,
                btnWidth: action.payload
            };
        default:
            return state;
    }
}



export const Menu: React.FC = ({ children }) => {
    let [state, dispatch] = useReducer(reducer, initialState);

    let context = { state, dispatch };
    const node = useRef<HTMLDivElement>(null!);

    const handleClickOutside = (evt: Event): void => {
        let element = evt.target as HTMLElement
        if (node.current.contains(element)) {
            return;
        }
        // outside click
        dispatch({ type: 'CLOSE_MENU' });
    }

    useEffect(() => {
        if (state.isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [state.isOpen]);

    return (
        <MenuContext.Provider value={context}>
            <MenuContainer ref={node}>
                {children}
            </MenuContainer>
        </MenuContext.Provider>
    );
}

export const MenuButton: React.FC = ({ children }) => {
    let {
        dispatch,
        state: { isOpen }
    } = useMenuContext();

    function handleMouseDown(event: React.MouseEvent) {
        event.preventDefault();

        if (isOpen === false) {
            dispatch({ type: 'OPEN_MENU' });
        } else if (isOpen === true) {
            dispatch({ type: 'CLOSE_MENU' });
        }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        switch (event.key) {
            case "ArrowDown":
            case "ArrowUp":
            case "Enter":
            case " ":
                event.preventDefault(); // prevent scroll
                dispatch({ type: 'OPEN_MENU' });
                break;
            case "Escape":
                dispatch({ type: 'CLOSE_MENU' });
                break;
            default:
                break;
        }
    }


    return (
        <Button
            aria-expanded={isOpen}
            aria-haspopup
            type="button"
            onKeyDown={handleKeyDown}
            onClick={handleMouseDown}>
            {children}
        </Button>
    );
};

export const MenuList: React.FC = ({ children }) => {

    let {
        state: { isOpen }
    } = useMenuContext();

    const transitions = useTransition(isOpen, null, {
        config: { duration: 110 },
        from: {
            position: 'absolute',
            transformOrigin: 'top',
            opacity: 0,
            visibility: 'hidden',
            transform: 'translateY(-16px)'
        },
        enter: {
            visibility: 'visible',
            opacity: 1,
            transform: 'translateY(0)'
        },
        leave: {
            transform: 'translateY(-14px)',
            opacity: 0,
            visibility: 'hidden'
        }
    }
    );

    return (<>
        {transitions.map(
            ({ item, key, props }) =>
                item && (
                    <ListUL key={key} style={props}>
                        {children}
                    </ListUL>
                )
        )}
    </>);
};

type MenuItemProps = {
    onClick?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void);
}

export const MenuItem: React.FC<MenuItemProps> = ({
    children,
    onClick,

}) => {
    let { dispatch } = useMenuContext();
    const handleSelection = () => {
        dispatch({ type: 'CLOSE_MENU' })
    }


    return <li onClick={onClick} onClickCapture={handleSelection} > {children}</li >
};



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////  STYLES  //////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
const MenuContainer = styled.div`
    position: static;
`;


const Button = styled.button`
    height: ${rems[32]};
    width: ${rems[32]};
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: ${rems[4]};
    border-color: transparent;
    color:${props => props.theme.text};
    &:hover, &:active, &[aria-expanded='true']{
                background:  ${props => props.theme.btnHover}
    }
    svg {
                width: ${rems[30]};
        height: ${rems[30]};
    }
`


const ListUL = styled(animated.div)`
	position: absolute;
	padding: 0;
	margin-top: 4px;
	background: ${props => props.theme.popup};
	border: none;
    outline: none;
	box-sizing: border-box;
	box-shadow: 0px 1.2px 3.6px rgba(64, 64, 64, 0.11),
		0px 8px 16px rgba(64, 64, 64, 0.16);
	border-radius: 3px;
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
    z-index: 2000;
    li {
                width: 100%;
        white-space: nowrap;
        height: ${rems[32]};
        padding-left: ${rems[8]};
        padding-right: ${rems[8]};
        display: flex;
        align-items: center;
        cursor: pointer;
        color: ${props => props.theme.text};

        transition: all 0.3s ease;
        &:hover {
                background: ${props => props.theme.hover};
        }
    }
	
`;

