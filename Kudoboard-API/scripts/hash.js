import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashAllPasswords() {
    const users = await prisma.user.findMany();

    for (const user of users) {
        if (!user.password.startsWith('$2')) {
        const hashed = await bcrypt.hash(user.password, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashed }
        });
        console.log(`✅ Password hashed for ${user.email}`);
        } else {
        console.log(`🔒 Already hashed: ${user.email}`);
        }
    }

    await prisma.$disconnect();
    console.log('✅ All done.');
    }

    hashAllPasswords().catch((err) => {
    console.error('❌ Error:', err);
    prisma.$disconnect();
});
