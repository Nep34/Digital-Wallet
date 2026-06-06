"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./modules/Auth/auth.route"));
const ledger_routes_1 = __importDefault(require("./modules/ledger/ledger.routes"));
const transaction_route_1 = __importDefault(require("./modules/Transaction/transaction.route"));
const wallet_route_1 = __importDefault(require("./modules/Wallet/wallet.route"));
const user_route_1 = __importDefault(require("./modules/User/user.route"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
}));
// Module routes
app.use('/auth', auth_route_1.default);
// Protected routes
app.use('/ledger', auth_middleware_1.default, ledger_routes_1.default);
app.use('/transactions', auth_middleware_1.default, transaction_route_1.default);
app.use('/wallet', auth_middleware_1.default, wallet_route_1.default);
app.use('/users', auth_middleware_1.default, user_route_1.default);
// Healthcheck
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
exports.default = app;
//# sourceMappingURL=app.js.map