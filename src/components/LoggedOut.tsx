import React, { useState, createContext, useContext, Children } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const TabsContext = createContext({});

function Tabs({ children }: any) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    return (
        <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
            <div data-tabs>{children}</div>
        </TabsContext.Provider>
    );
}

const TabContext = createContext({});

function TabList({ children }: any) {
    const wrappedChildren = Children.map(children, (child, index) => (
        <TabContext.Provider value={index}> {child}</TabContext.Provider>
    ));
    return <div data-tab-list>{wrappedChildren}</div>;
}

function Tab({ children, isDisabled, ...rest }: any) {
    const index = useContext(TabContext);
    const { activeIndex, setActiveIndex } = useContext<any>(TabsContext);
    const isActive = index === activeIndex;
    const clsIsDisabled = isDisabled ? 'disabled' : 'isActive' ? 'active' : '';
    return (
        <div
            data-tab
            css={styleTabsButton}
            onClick={isDisabled ? undefined : () => setActiveIndex(index)}
            {...rest}>
            {children}
        </div>
    );
}

function TabPanels({ children }: any) {
    const { activeIndex }: any = useContext(TabsContext);
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
            label: 'Signup',
            content: <SignupForm />
        },
        {
            label: 'Login',
            content: <LoginForm />
        }
    ];
    return (
        <div>
            <DataTabs data={tabData} />
        </div>
    );
}

const styleTabsButton = css`
    margin-top: 1rem;
    display: flex;
    width: 100%;
    justify-content: center;
    color: tomato;
`;
