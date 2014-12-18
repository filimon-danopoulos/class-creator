// <reference path="../contracts/index.d.ts" />

import CsharpGenerator = require("../generators/csharp/CsharpGenerator");

class CsharpCodeService implements ICodeService {
    constructor(parser: IParser, tokenizer: ITokenizer) {
        this.parser = parser;
        this.tokenizer = tokenizer;
        this.generator = new CsharpGenerator(); 
    }
    getCodeAsString(data: any): string {
        throw "Not Implemented";
        return "";    
    }       
    getCodeAsStrings(data: any): string[] {
        throw "Not Implemented";
        return [""];    
    }
    getCodeAsFile(data: any): any {
        throw "Not Implemented";    
    }
    getCodeAsFiles(data: any): any {
        throw "Not Implemente";
        return [];    
    }
    parser: IParser;
    tokenizer: ITokenizer;
    generator: ICodeGenerator;
}

export = CsharpCodeService;
