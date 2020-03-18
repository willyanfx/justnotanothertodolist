import React, { useState, createContext, useContext, Children } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { rems } from '../constants/tokens';

const TabsContext = createContext({});

const Tabs: React.FC = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    return (
        <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
            <div data-tabs>{children}</div>
        </TabsContext.Provider>
    );
};

const TabContext = createContext({});

const TabList: React.FC = ({ children }) => {
    const wrappedChildren = Children.map(children, (child, index) => (
        <TabContext.Provider value={index}> {child}</TabContext.Provider>
    ));
    return <div data-tab-list>{wrappedChildren}</div>;
};

type TabProps = {
    isDisabled?: boolean;
    children: React.ReactNode;
};

function Tab<T extends TabProps>({ children, isDisabled, ...rest }: T) {
    const index = useContext(TabContext);
    const { activeIndex, setActiveIndex } = useContext<any>(TabsContext);
    const isActive = index === activeIndex;
    const clsIsDisabled = isDisabled ? 'disabled' : 'isActive' ? 'active' : '';
    return (
        <div
            disabled={clsIsDisabled}
            data-tab={isActive}
            onClick={isDisabled ? undefined : () => setActiveIndex(index)}
            {...rest}>
            {children}
        </div>
    );
}

function TabPanels({ children }: any) {
    const { activeIndex }: any = useContext(TabsContext)!;
    return <div data-tab-panels>{children[activeIndex]}</div>;
}

function TabPanel({ children }: any) {
    return children;
}

function DataTabs({ data }: any) {
    return (
        <Tabs>
            <TabList>
                {data.map((tab: { label: string }) => (
                    <Tab key={tab.label}>{tab.label}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {data.map((tab: { content: React.ReactNode }) => (
                    <TabPanel key={tab.content}>{tab.content}</TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}

export default function LoggedOut() {
    const tabData = [
        {
            label: 'Login',
            content: <LoginForm />
        },
        {
            label: 'Signup',
            content: <SignupForm />
        },
    ];
    return (
        <Container>
            <DataTabs data={tabData} />
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    background: ${props => props.theme.login};
    display: flex;
    align-items: center;
    justify-content: center;
    color:${props => props.theme.text};

    [data-tab-panels] {
        width: 22.5rem;
        padding: ${rems[32]} ${rems[32]};
        border-radius: ${rems[4]};
        border-top-left-radius: 0;
        
        background:  ${props => props.theme.main};
        /* background: #2f2f2f; */
        /* 06 dp */

        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2),
            0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14);
    }
    [data-tab-list] {
        display: inline-flex;
    }
    [data-tab] {
        padding: ${rems[8]} ${rems[16]};
        margin-right: ${rems[4]};
        background:  ${props => props.theme.hover};
        z-index: 200;
        cursor: pointer;
        border-top-left-radius: ${rems[4]};
        border-top-right-radius: ${rems[4]};
    }
    [data-tab='true'] {
        background: ${props => props.theme.main};
        border-top-left-radius: ${rems[4]};
        border-top-right-radius: ${rems[4]};
    }
`;
