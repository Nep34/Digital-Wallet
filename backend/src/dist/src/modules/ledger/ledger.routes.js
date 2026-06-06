"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ledger_controller_1 = require("./ledger.controller");
const ledgerRouter = express_1.default.Router();
ledgerRouter.get('/', ledger_controller_1.getLedgerEntriesController);
exports.default = ledgerRouter;
//# sourceMappingURL=ledger.routes.js.map