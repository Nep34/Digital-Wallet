"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("./wallet.controller");
const walletRouter = express_1.default.Router();
walletRouter.get('/', wallet_controller_1.GetWallet);
exports.default = walletRouter;
//# sourceMappingURL=wallet.route.js.map