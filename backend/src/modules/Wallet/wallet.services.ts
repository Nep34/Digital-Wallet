import prisma from '../../config/prismaClient';

const CreateWalletService = async (userId: string) => {
    try {
        const wallet = await prisma.wallet.create({
            data: {
                userId
            }
        });
        return wallet;
    }
 catch (error) {
        throw new Error('Failed to create wallet');
    }
}

