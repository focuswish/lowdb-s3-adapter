interface Base {
    source: any;
    defaultValue: any;
    serialize: any;
    deserialize: any;
    fs: any;
}
declare class Base {
    constructor(params?: {}, AwsConfig?: {}, {defaultValue, serialize, deserialize, mergeState}?: {
        defaultValue?: {};
        serialize?: (obj: any) => string;
        deserialize?: (text: string, reviver?: (key: any, value: any) => any) => any;
        mergeState?: boolean;
    });
}
export default Base;
