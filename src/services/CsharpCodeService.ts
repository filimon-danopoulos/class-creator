// <reference path="../contracts/index.d.ts" />

import CsharpGenerator = require("../generators/csharp/CsharpGenerator");

class CsharpCodeService implements ICodeService {
    constructor(parser: IParser, tokenizer: ITokenizer) {
        this.parser = parser;
        this.tokenizer = tokenizer;
        this.generator = new CsharpGenerator(); 
    }
    getCodeAsString(data: any): string {
        var result = "";
        var parsed = this.parser.parse(data);
        var tokenized = this.tokenizer.tokenize(parsed);
        for (var i = 0, l = tokenized.length; i < l; i++) {
           result += "\n"+this.generator.generate(tokenized[i].className, tokenized[i].tokens);
        }
        return result;
    }       
    getCodeAsStrings(data: any): string[] {
        throw "Not Implemented";
        return [""];    
    }
    getCodeAsFile(data: any): any {
        throw "Not Implemented";    
    }
    getCodeAsFiles(data: any): any {
        throw "Not Implemented";
        return [];    
    }
    parser: IParser;
    tokenizer: ITokenizer;
    generator: ICodeGenerator;
}

export = CsharpCodeService;
