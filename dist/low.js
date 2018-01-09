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
const lodash = require('lodash');
const flat = require('flat');
const { unflatten } = flat;
const getPath = o => lodash.toPath(lodash.keys(flat(o))[0]).slice(0, 2);
function low(adapter) {
    const _ = lodash.runInContext();
    const db = _.chain({});
    const value = _.prototype.value;
    db.getKey = actions => lodash.toPath([...actions[0].args][0]);
    _.prototype.save = _.wrap(value, function (func) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = db.getKey(this.__actions__);
            let val;
            if (!db.getVal(key)) {
                val = yield adapter.read(key);
                console.log(this);
                this.__wrapped__ = Object.assign({}, this.__wrapped__, val);
                console.log(this);
                key = getPath(val);
            }
            console.log('save()', [key, val]);
            val = func.apply(this);
            //console.log(this)
            return db.save(key, val);
        });
    });
    _.prototype.value = _.wrap(value, function (func) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = db.getKey(this.__actions__);
            let val = yield adapter.read(key);
            console.log('value()', [key, val]);
            this.__wrapped__ = Object.assign({}, this.__wrapped__, val);
            return func.apply(this);
        });
    });
    db.save = (key, val) => __awaiter(this, void 0, void 0, function* () {
        console.log('db.save', [key, val]);
        let state = db.getVal(key);
        let w = yield adapter.write(key, flat(state, { object: true }));
        return val;
    });
    db._ = _;
    db.getVal = (key = undefined) => key ?
        lodash.get(db.__wrapped__, key) : db.__wrapped__;
    return db;
}
module.exports = low;
exports.default = low;
//# sourceMappingURL=low.js.map