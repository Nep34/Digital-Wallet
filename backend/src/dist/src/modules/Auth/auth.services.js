"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../utils/token");
const prismaClient_1 = __importDefault(require("../../config/prismaClient"));
const wallet_services_1 = require("../Wallet/wallet.services");
const loginService = async (email, password) => {
    try {
        const user = await prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = (0, token_1.generateToken)(user.id.toString());
        return { user, token };
    }
    catch (error) {
        throw new Error(error.message || 'Login failed');
    }
};
exports.loginService = loginService;
const registerService = async (name, email, password) => {
    try {
        const existingUser = await prismaClient_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const result = await prismaClient_1.default.$transaction(async (tx) => {
            const newUser = await tx.user.create({ data: { name, email, password: hashedPassword } });
            await (0, wallet_services_1.CreateWalletService)(tx, newUser.id);
            const token = (0, token_1.generateToken)(newUser.id.toString());
            return { user: newUser, token };
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Registration failed');
    }
};
exports.registerService = registerService;
//# sourceMappingURL=auth.services.js.map