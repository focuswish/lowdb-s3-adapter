"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tools_1 = require("s3-tools/dist/Tools");
const graceful_s3_1 = require("graceful-s3");
class Base {
    constructor(params = {}, AwsConfig = {}, { defaultValue = {}, serialize = obj => JSON.stringify(obj, null, 2), deserialize = JSON.parse, } = {}) {
        this.source = new Tools_1.default(params, AwsConfig);
        this.defaultValue = defaultValue;
        this.serialize = serialize;
        this.deserialize = deserialize;
        this.graceful = graceful_s3_1.default(params, AwsConfig, {
            defaultValue,
            serialize,
            deserialize
        });
    }
}
exports.default = Base;
//# sourceMappingURL=Base.js.map