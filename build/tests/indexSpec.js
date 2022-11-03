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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const imageAPI_1 = __importDefault(require("./../imageAPI"));
const request = (0, supertest_1.default)(app_1.default);
describe('Try opening main Endpoint ', () => {
    it('should return a status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image');
        expect(response.statusCode).toBe(200);
    }));
});
describe('Show Available Images', () => {
    it('should return a status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/showImages');
        yield expect(response.statusCode).toBe(200);
    }));
});
describe('Try Resizing fjord Image', () => {
    it('should return a status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/fjord/50/50');
        expect(response.statusCode).toBe(200);
    }));
});
describe('Try getting not found image file ', () => {
    it('should return a status code 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/ahmed/50/50');
        expect(response.statusCode).toBe(404);
    }));
});
describe('Check an image Transforms correctly ', () => {
    it('Exepect the image path returned is correct ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, imageAPI_1.default)('fjord', 50, 50);
        expect(response).toEqual('thumbs/fjord_50x50.jpg');
    }));
});
describe('Try sending minus width ', () => {
    it('should return a status code 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/fjord/-50/50');
        expect(response.statusCode).toBe(404);
    }));
});
describe('Try sending minus height ', () => {
    it('should return a status code 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/fjord/50/-50');
        expect(response.statusCode).toBe(404);
    }));
});
describe('Try sending non number width ', () => {
    it('should return a status code 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/fjord/50a/50');
        expect(response.statusCode).toBe(404);
    }));
});
describe('Try sending non number height ', () => {
    it('should return a status code 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/image/fjord/50/50a');
        expect(response.statusCode).toBe(404);
    }));
});
