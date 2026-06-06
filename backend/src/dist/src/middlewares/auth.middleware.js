"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../utils/token");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    try {
        const payload = (0, token_1.verifyToken)(token);
        req.user = payload;
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map