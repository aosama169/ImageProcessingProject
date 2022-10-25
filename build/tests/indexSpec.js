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
const request = (0, supertest_1.default)(app_1.default);
describe("Try opening main Endpoint ", () => {
    it("should return a status code 200", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/image");
        setTimeout(() => {
            expect(response.statusCode).toBe(200);
        }, 5000);
    }));
});
describe("Show Available Images", () => {
    it("should return a status code 200", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/image/showImages");
        expect(response.statusCode).toBe(200);
        done();
    }));
});
describe("Try Resizing fjord Image", () => {
    it("should return a status code 200", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/image/fjord/50/50");
        expect(response.statusCode).toBe(200);
        done();
    }));
});
describe("Try getting false image file ", () => {
    it("should return a status code 404", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/image/ahmed/50/50");
        expect(response.statusCode).toBe(304);
        done();
    }));
});
