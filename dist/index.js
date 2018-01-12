"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
const stream_1 = require("stream");
class Adapter extends Base_1.default {
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.source.get().text();
                return data ? this.deserialize(data) : this.defaultValue;
            }
            catch (e) {
                let stream = new stream_1.Readable;
                stream.push(this.serialize(this.defaultValue));
                stream.push(null);
                yield this.source.streamUpload(stream).promise();
                return this.defaultValue;
            }
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.graceful.write(this.serialize(data));
        });
    }
}
exports.default = Adapter;
module.exports = Adapter;
//# sourceMappingURL=index.js.map