/// <reference path="../contracts/index.d.ts" />

class JsonParser implements IParser {
    parse(input: {[key: string]:any}) : any {
        return input;    
    }
}

export = JsonParser;
