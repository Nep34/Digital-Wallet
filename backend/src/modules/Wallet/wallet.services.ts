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

const GetWalletService = async (userId: string) => {
    try {
        const wallet = await prisma.wallet.findUnique({
            where: {
                userId
            }
        });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return wallet;
    } catch (error) {
        throw new Error('Failed to get wallet');
    }   
}

export { CreateWalletService, GetWalletService };
