/// <reference path="../contracts/index.d.ts" />

import TypeScriptGenerator = require("../generators/typescript/TypeScriptGenerator");

class TypeScriptCodeService implements ICodeService {
    constructor(parser: IParser, tokenizer: ITokenizer) {
        this.parser = parser;
        this.tokenizer = tokenizer;
        this.generator = new TypeScriptGenerator(); 
    }
    getCodeAsString(data: {[key: string]: string}): string {
        var result = "";
        var parsed = this.parser.parse(data);
        var tokenized = this.tokenizer.tokenize(parsed);
        for (var i = 0, l = tokenized.length; i < l; i++) {
           result += "\n"+this.generator.generate(tokenized[i].className, tokenized[i].tokens);
        }
        return result;
    }       
    getCodeAsStrings(data: {[key: string]: string}): string[] {
        var result = [];
        var parsed = this.parser.parse(data);
        var tokenized = this.tokenizer.tokenize(parsed);
        for (var i = 0, l = tokenized.length; i < l; i++) {
           result.push(this.generator.generate(tokenized[i].className, tokenized[i].tokens));
        }
        return result;
   
    }
    parser: IParser;
    tokenizer: ITokenizer;
    generator: ICodeGenerator;
}

export = TypeScriptCodeService;
