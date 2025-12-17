import type { NextApiRequest, NextApiResponse } from 'next';
import { Timer } from '../../types';
import { getTimers, updateTimer } from '../../lib/db';

export default async function syncHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { timerId, state }: { timerId: string; state: Timer } = req.body;

        if (!timerId || !state) {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        // Update the timer in the database
        await updateTimer(timerId, {
            title: state.title,
            duration: state.duration,
            remainingTime: state.remainingTime,
            isActive: state.isActive,
            isPaused: state.isPaused
        });

        return res.status(200).json({ message: 'Timer synchronized successfully' });
    } else if (req.method === 'GET') {
        // Retrieve all timers from the database
        const timers = await getTimers();
        return res.status(200).json(timers);
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}