import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useAppState } from '../app-state';
import { createDoc } from '../helpers';
import { format as formatDate, addDays } from 'date-fns';
import useProject from '../hooks/useProject';
import { MenuItem, Menu, MenuButton, MenuList } from './MenuButton';
import { StandardProj } from '../types';
import { InputField } from '../Styles'
import { PrimaryBtn, SecondaryBtn } from '../Styles';
import { Today, ProjectIcon } from './Assets/Icons';
import { useRequiredInput } from '../hooks/useRequiredInput';
import { } from 'react-router';

export const AddTask: React.FC<{ onCancel?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void), id: string }>
    = ({ onCancel, id }) => {

        const [{ auth }] = useAppState();
        const [{ user }] = useAppState();
        const projects = useProject(user.uid);
        const [value, setValue] = useState<string>('');
        const [taskDate, setTaskDate] = useState(id);
        const [projectName, setProjectName] = useState('');
        const { error, setError } = useRequiredInput()


        const handleChange = useCallback((newValue) => {
            const text: string = newValue.currentTarget.value
            setValue(text)
        }, []);

        const handleSubmit = (event: React.SyntheticEvent) => {
            event.preventDefault();
            let projectId = projectName || taskDate;
            let collectedDate: string = '';

            if (projectId === 'TODAY') {
                collectedDate = formatDate(Date.now(), 'dd/MM/yyyy');
            } else if (projectId === 'NEXT_7DAYS') {
                collectedDate = formatDate(addDays(Date.now(), 6), 'dd/MM/yyyy');
            }


            if (value === '') {
                setError(true)
            } else {
                createDoc(
                    {
                        date: collectedDate,
                        uid: auth.uid,
                        task: value,
                        projectId,
                        archived: false
                    },
                    'tasks'
                ).then(() => {
                    setValue('');
                    setProjectName('');
                })
            }


        };

        useEffect(() => {
            document.title = `${id}: ${value}`
            return () => {
                document.title = 'Boring TODO'
            }
        }, [value])

        return (
            <Newtask>
                <InputField
                    data-error={error}
                    value={value}
                    placeholder='Add Task'
                    onChange={handleChange}
                    tabIndex={0}
                    aria-atomic="true"
                    aria-label='add task'
                    type="text"
                    required
                />
                <div>
                    <span>
                        <PrimaryBtn onClick={handleSubmit}>Add Task</PrimaryBtn>
                        <SecondaryBtn onClick={onCancel}>Cancel</SecondaryBtn>
                    </span>
                    <span>
                        <Menu>
                            <MenuButton>
                                <Today />
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={() => setTaskDate(StandardProj.inbox)}>
                                    Inbox
                        </MenuItem>

                                <MenuItem
                                    onClick={() => setTaskDate(StandardProj.today)}>
                                    Today
                        </MenuItem>
                                <MenuItem
                                    onClick={() => setTaskDate(StandardProj.next7)}>
                                    Next 7 days
                        </MenuItem>
                            </MenuList>
                        </Menu>
                        {projects && (
                            <Menu >
                                <MenuButton><ProjectIcon /> </MenuButton>
                                <MenuList>
                                    {projects.map((item: any) => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={() => setProjectName(item.name)}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        )}
                    </span>
                </div>
            </Newtask>
        );
    };

const Newtask = styled.div`
    color: ${props => props.theme.text};
    > div {
        display: flex;
        justify-content: space-between;
        > span {
            display: inline-grid;
            grid-auto-flow: column;
            grid-column-gap: 16px;
        }
    }
`;
