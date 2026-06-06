"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
// Placeholder routes for User module
userRouter.get('/', (req, res) => {
    res.status(501).json({ message: 'User routes not implemented yet' });
});
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map