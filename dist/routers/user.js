"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/register', user_1.register);
router.post('/login', user_1.login);
//korumalı route
router.post('/profile', auth_1.authenticate, user_1.getProfile);
exports.default = router;
