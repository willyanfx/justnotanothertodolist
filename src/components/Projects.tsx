import React, { useState, useEffect, FC } from 'react';
import { useAppState } from '../app-state';
import useProject from '../hooks/useProject';
import { deleteProject } from '../helpers';

const initialValue = [
    { projectId: 'MUSIC', name: 'ELAIA' },
    { projectId: 'asdadsads', name: 'test' }
];

type Proj = {
    createdAt: number;
    id: string;
    name: string;
    projectId: string;
    uid: string;
};

const Projects: React.FC = (): JSX.Element => {
    const [{ user }] = useAppState();
    const [projectCollection, setProjectCollection] = useState<Proj[]>([]);
    const projects = useProject(user.uid);
    useEffect(() => {
        if (projects) setProjectCollection(projects);
    }, [projects]);

    let projectDisplay = projectCollection.map(proj => (
        <li key={proj.id}>
            <div
                role='button'
                tabIndex={0}
                aria-label={`Select ${proj.name} as the task project`}>
                {proj.name}
            </div>
            <button onClick={() => deleteProject(proj.id)}>delete</button>
        </li>
    ));

    return <ul> {projectDisplay}</ul>;
};
export default Projects;
