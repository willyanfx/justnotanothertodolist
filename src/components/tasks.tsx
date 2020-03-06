import React, { useState, useEffect, useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Checkbox } from './Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppState } from '../app-state';
import useTasks from '../hooks/useTasks';
import { AddTask } from './AddTask';
import { deleteTask, doneTask } from '../helpers';
import { useParams } from 'react-router-dom';
import { StandardProj, AddTaskProps } from '../types';
import AddDialog from './AddDialog';
import { DialogStateContext, DialogSetContext } from '../context/DialogContext';

function ListItem({ item, index }: { item: AddTaskProps; index: number }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <div
                    css={styleItems}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Checkbox onClick={() => doneTask(item.id)} />
                    <span>{item.task}</span>
                    <button onClick={() => deleteTask(item.id)}>♻️</button>
                </div>
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
    const [showAddTask, setShowAddTask] = useState(true);
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

    let title: string;
    switch (id) {
        case StandardProj.inbox:
            title = 'Inbox';
            break;
        case StandardProj.today:
            title = 'Today';
            break;
        case StandardProj.next7:
            title = 'Next 7 Days';
            break;
        default:
            title = '' + id;
    }

    return (
        <>
            <AddDialog
                isOpen={showModal}
                onDismiss={() => setShowModal(!showModal)}>
                <AddTask />
            </AddDialog>
            <div css={styleDisplay}>
                <h2>{title}</h2>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='list'>
                        {provided => (
                            <div
                                css={styleList}
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <TasksList items={taskItems} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div css={addTaskCSS}>
                    <button onClick={() => setShowAddTask(!showAddTask)}>
                        <span>+</span>
                        <span>Add Task</span>
                    </button>
                    {showAddTask && (
                        <AddTask
                            onCancel={() => setShowAddTask(!showAddTask)}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

const GRID = 8;
const addTaskCSS = css`
    margin-top: 20px;
`;
const styleDisplay = css`
    width: 656px;
    background-color: white;
    margin-left: 266px;
    border-right: 3px;
    vertical-align: top;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 80px;
    padding-bottom: 84px;

    h2 {
        font-size: 20px;
        font-weight: normal;
        margin: 0 30px 20px 0;
    }
`;

const styleList = css`
    display: flex;
    flex-direction: column;
    line-height: 18px;
    color: #333;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    list-style-type: none;
    border-bottom: 1px solid #f0f0f0;
`;

const styleItems = css`
    display: flex;
    width: 100%;
    border: 1px solid grey;
    margin-bottom: ${GRID}px;
    background-color: #fff;
    padding: ${GRID}px;
`;
