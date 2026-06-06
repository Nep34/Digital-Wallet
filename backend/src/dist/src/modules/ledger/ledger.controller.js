"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLedgerEntriesController = void 0;
const ledger_services_1 = require("./ledger.services");
const wallet_services_1 = require("../Wallet/wallet.services");
const getLedgerEntriesController = async (req, res) => {
    try {
        const userId = req.user.id;
        const wallet = await (0, wallet_services_1.GetWalletService)(userId);
        const walletId = wallet.id;
        const ledgerEntries = await (0, ledger_services_1.GetLedgerEntriesService)(walletId);
        res.status(200).json(ledgerEntries);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getLedgerEntriesController = getLedgerEntriesController;
//# sourceMappingURL=ledger.controller.js.map