"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const checker = (req, res, next) => {
    const imageName = req.params.fileName;
    let match = false;
    fs_1.default.readdir('../../thumbs/', (err, files) => {
        files.forEach((file) => {
            if (file.split('.')[0] == imageName) {
                match = true;
                //break;
            }
        });
        if (!match) {
            return res
                .status(404)
                .send('No File name With the name: ' + imageName + ' Found, Check the Spelling and try Again!');
        }
        else {
            next();
        }
    });
};
exports.default = checker;
