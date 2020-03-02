import { useState, useEffect } from 'react';
import { subscribeToTask, fetchTasks } from '../helpers';
const cache: any = {};

export default function useTasks(
    uid: string,
    project: string,
    { listen } = { listen: true }
) {
    const cached = cache[uid];
    const [tasks, setTasks] = useState(cached);
    useEffect(() => {
        if (listen) {
            return subscribeToTask(uid, project, (tasks: any) => {
                cache[uid] = tasks;
                setTasks(tasks);
            });
        }
    }, [uid, listen, project]);

    return tasks;
}

export async function preloadTasks(uid: string) {
    cache[uid] = await fetchTasks(uid);
    return;
}
