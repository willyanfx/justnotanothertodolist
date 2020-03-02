import React, { useState, useEffect, FC } from 'react';
import { useAppState } from '../app-state';
import useProject from '../hooks/useProject';
import { deleteProject } from '../helpers';
import { Link } from 'react-router-dom';

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
        <li key={proj.id} tabIndex={0}>
            <Link
                to={`/${proj.name}`}
                aria-label={`Select ${proj.name} as the task project`}>
                {proj.name}
            </Link>
            <button onClick={() => deleteProject(proj.id)}>delete</button>
        </li>
    ));

    return <ul> {projectDisplay}</ul>;
};
export default Projects;
