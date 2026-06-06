"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const auth_services_1 = require("./auth.services");
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const { user, token } = await (0, auth_services_1.loginService)(email, password);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.loginController = loginController;
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        const { user, token } = await (0, auth_services_1.registerService)(name, email, password);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.registerController = registerController;
//# sourceMappingURL=auth.controller.js.map