import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppState } from '../app-state';
import useTasks from '../hooks/useTasks';
import { AddTask } from './AddTask';
import { deleteTask, doneTask, useID } from '../helpers';
import { useParams } from 'react-router-dom';
import { StandardProj, AddTaskProps } from '../types';
import AddDialog from './AddDialog';
import { Checkbox } from './Checkbox';
import { DialogStateContext, DialogSetContext } from '../context/DialogContext';
import { rems } from '../constants/tokens';
import { Delete, Plus } from './Assets/Icons';


function ListItem({ item, index }: { item: AddTaskProps; index: number }) {
    let { id } = useParams();
    const getId = useID(`checkbox-${id}`);
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <ListItemDiv
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <span>
                        <Checkbox id={getId} onClick={() => doneTask(item.id)} />
                        <h4>{item.task}</h4>
                    </span>

                    <span onClick={() => deleteTask(item.id)}>
                        <Delete />
                    </span>
                </ListItemDiv>
            )}
        </Draggable>
    );
}

// Ensuring the whole list does not re-render when the droppable re-renders
const TasksList = React.memo(function TasksList({ items }: any) {
    return items.map((item: AddTaskProps, index: number) => (
        <ListItem item={item} index={index} key={item.id} />
    ));
});

const reorder = (
    list: Iterable<unknown> | ArrayLike<unknown>,
    startIndex: number,
    endIndex: number
) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const Tasks = () => {
    const [taskItems, setTasksItems] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const showModal = useContext(DialogStateContext);
    const setShowModal = useContext(DialogSetContext);
    const [{ user }] = useAppState();
    let { id } = useParams();
    let selectedProject = String(id);

    const tasks = useTasks(user.uid, selectedProject);
    useEffect(() => {
        if (tasks) setTasksItems(tasks);
    }, [tasks]);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }

        const newList: any = reorder(
            taskItems,
            result.source.index,
            result.destination.index
        );

        setTasksItems(newList);
    };

    let title = id === StandardProj.next7 ? 'Next 7 Days' : id;
    return (
        <>
            <AddDialog
                isOpen={showModal}
                onDismiss={() => setShowModal(!showModal)}
            />
            <DisplayItem>
                <h2>{title}</h2>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='list'>
                        {provided => (
                            <List
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <TasksList items={taskItems} />
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
                <AddTaskDiv>
                    <button onClick={() => setShowAddTask(!showAddTask)}>
                        <Plus />
                        <span>Add Task</span>
                    </button>
                    {showAddTask && (
                        <AddTask
                            id={id || ''}
                            onCancel={() => setShowAddTask(!showAddTask)}
                        />
                    )}
                </AddTaskDiv>
            </DisplayItem>
        </>
    );
};

const GRID = 0.5;

const AddTaskDiv = styled.div`
    border-top: 1px solid ${props => props.theme.divider};
    margin-top: ${rems[16]};
    padding-top: ${rems[16]};
    > button {
       color: ${props => props.theme.text};
       font-size: ${rems[20]};
       border: none;
       background: none;
       font-weight: 400;
       padding: 0 ${rems[8]};
       border-radius: ${rems[4]};
       display: flex;
       align-items: center;
        svg {
           width: ${rems[30]};
           height: ${rems[30]};
       }
       &:hover {
           background: ${props => props.theme.btnHover}
        }
    }
`;

const DisplayItem = styled.div`
    width: 41rem;
    height: 100%;
    background: ${props => props.theme.main};
    color: ${props => props.theme.text};
    margin-left: 16.625rem;
    border-right: ${rems[4]};
    vertical-align: top;
    padding-left: ${rems[40]};
    padding-right: ${rems[40]};
    padding-top: 80px;
    padding-bottom: 84px;
    h2 {
        text-transform: capitalize;
        font-size: ${rems[24]};
        font-weight: 400;
        margin: 0 ${rems[30]} ${rems[20]} 0;
    }
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListItemDiv = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.level100};
    border-radius: ${rems[4]};
    margin-bottom: ${GRID}rem;
    padding: ${rems[16]} ${rems[16]};
    align-items: center;
    justify-content: space-between;
    span {
        display: flex;
        flex-direction: row;
    }
    h4 {
        font-size: ${rems[20]};
        font-weight: 400;
        padding: 0;
        margin: 0;
        margin-left: ${rems[8]};
    }
`;
