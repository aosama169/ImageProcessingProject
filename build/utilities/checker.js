"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
//Checker searches for cached images not to resize the image multiple times.
function isNumber(n) {
    return /^(\d+.)*(\d+)$/.test(n);
}
const checker = (req, res, next) => {
    if (!isNumber(req.params.width) || !isNumber(req.params.height)) {
        res.status(404).send('Hight And Width required should be in numbers only.');
        return;
    }
    if (req.params.fileName.length <= 0) {
        res.status(404).send('Please Enter Valid Image File');
        return;
    }
    if (parseInt(req.params.width) <= 0 || parseInt(req.params.height) <= 0) {
        res
            .status(404)
            .send('Width and Hight Parameters Should be bigger than Zero!');
        return;
    }
    const imageWidth = parseInt(req.params.width);
    const imageHight = parseInt(req.params.height);
    const imageName = req.params.fileName + '_' + imageWidth + 'x' + imageHight;
    let match = false;
    let imageFile = '';
    fs_1.default.readdir('./thumbs/', (err, files) => __awaiter(void 0, void 0, void 0, function* () {
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
                const img = yield fs_1.default.readFileSync('thumbs/' + imageFile);
                res.writeHead(200, { 'Content-Type': 'image/gif' });
                res.end(img);
            }
        }
    }));
};
exports.default = checker;
