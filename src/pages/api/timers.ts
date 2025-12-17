import { NextApiRequest, NextApiResponse } from 'next';
import { Timer } from '../../types';
import { getTimers, createTimer, updateTimer, deleteTimer } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const timers = await getTimers();
            res.status(200).json(timers);
            break;
        case 'POST':
            const { title, duration } = req.body;
            if (!title || !duration) {
                return res.status(400).json({ message: 'Title and duration are required' });
            }
            const newTimer = await createTimer({ title, duration, remainingTime: duration });
            res.status(201).json(newTimer);
            break;
        case 'PUT':
            const { id, ...updateData } = req.body;
            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }
            const updatedTimer = await updateTimer(id, updateData);
            res.status(200).json(updatedTimer);
            break;
        case 'DELETE':
            const { id: deleteId } = req.body;
            if (!deleteId) {
                return res.status(400).json({ message: 'ID is required' });
            }
            await deleteTimer(deleteId);
            res.status(204).end();
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}