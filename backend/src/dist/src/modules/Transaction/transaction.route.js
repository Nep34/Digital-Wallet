"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transacrion_controller_1 = require("./transacrion.controller");
const transactionRouter = express_1.default.Router();
transactionRouter.post('/', transacrion_controller_1.CreateTransactionController);
transactionRouter.get('/', transacrion_controller_1.GetTransactionsController);
exports.default = transactionRouter;
//# sourceMappingURL=transaction.route.js.map