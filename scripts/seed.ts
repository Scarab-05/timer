import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed initial timer data
    const timers = [
        {
            title: 'Presentation Timer 1',
            duration: 300, // 5 minutes
            remainingTime: 300,
            isActive: false,
            isPaused: false,
        },
        {
            title: 'Presentation Timer 2',
            duration: 600, // 10 minutes
            remainingTime: 600,
            isActive: false,
            isPaused: false,
        },
        {
            title: 'Presentation Timer 3',
            duration: 900, // 15 minutes
            remainingTime: 900,
            isActive: false,
            isPaused: false,
        },
    ];

    for (const timer of timers) {
        await prisma.timer.create({
            data: timer,
        });
    }

    console.log('Database seeded with initial timers.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });