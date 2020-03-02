import { useState, useEffect } from 'react';
import { fetchProject, subscribeToProject } from '../helpers';

const cache: any = {};
export default function useProject(uid: string, { listen } = { listen: true }) {
    const [project, setProject] = useState();
    useEffect(() => {
        if (listen) {
            return subscribeToProject(uid, (projects: any) => {
                cache[uid] = projects;
                setProject(projects);
            });
        }
    }, [listen, uid]);

    return project;
}
export async function preloadProjects(uid: string) {
    cache[uid] = await fetchProject(uid);
    return;
}
