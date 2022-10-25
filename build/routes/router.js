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
const express_1 = __importDefault(require("express"));
const checker_1 = __importDefault(require("../utilities/checker"));
const imageAPI_1 = __importDefault(require("../imageAPI"));
const fs_1 = __importDefault(require("fs"));
const Router = express_1.default.Router();
Router.get('/?fileName=:name&width=:width&height=:height', checker_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.params.fileName;
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height);
    if (width <= 0 || height <= 0) {
        return res
            .status(404)
            .send('Please Enter Valid Width And Hight');
    }
    const alteredImage = yield (0, imageAPI_1.default)(fileName, width, height);
    //const parentPath = path.resolve(alteredImage);
    const img = fs_1.default.readFileSync(alteredImage);
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    res.end(img);
}));
exports.default = Router;
