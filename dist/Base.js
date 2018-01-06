"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tools_1 = require("s3-tools/dist/Tools");
class Base {
    constructor(params = {}, AwsConfig = {}, { defaultValue = {}, serialize = obj => JSON.stringify(obj, null, 2), deserialize = JSON.parse } = {}) {
        this.source = new Tools_1.default(params, AwsConfig);
        this.defaultValue = defaultValue;
        this.serialize = serialize;
        this.deserialize = deserialize;
    }
}
exports.default = Base;
//# sourceMappingURL=Base.js.map