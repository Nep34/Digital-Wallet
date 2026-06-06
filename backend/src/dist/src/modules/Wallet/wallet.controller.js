"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWallet = void 0;
const wallet_services_1 = require("./wallet.services");
const GetWallet = async (req, res) => {
    try {
        const userId = req.user.id;
        const wallet = await (0, wallet_services_1.GetWalletService)(userId);
        res.status(200).json(wallet);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.GetWallet = GetWallet;
//# sourceMappingURL=wallet.controller.js.map