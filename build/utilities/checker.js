"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const checker = (req, res, next) => {
    const imageName = req.params.fileName;
    let match = false;
    let imageFile = '';
    fs_1.default.readdir('./thumbs/', (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach((file) => {
                if (file.split('.')[0] == imageName) {
                    match = true;
                    imageFile = file;
                    //break;
                }
            });
            if (!match) {
                next();
            }
            else {
                res.writeHead(200, { 'Content-Type': 'image/gif' });
                res.send(imageFile);
            }
        }
    });
};
exports.default = checker;
