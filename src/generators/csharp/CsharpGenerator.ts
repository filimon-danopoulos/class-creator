// <reference path="../contracts/index.d.ts" />

import CsharpGeneratorHelper = require("./CsharpGeneratorHelper");

class CsharpGenerator implements ICodeGenerator {
    constructor() {
        this.helper = new CsharpGeneratorHelper();    
    } 
    generate(className: string, tokens: IToken[]) : string {
        var classTemplate = this.helper.getTemplate();
        var members: string[] = [];
        for (var i = 0, l = tokens.length; i < l; i++) {
            members.push(this.helper.generateMember(tokens[i]));
        }
        var classContent = members.join("\n");
        var result = classTemplate.getTemplate();

        result = result.replace("{{className}}", className);
        result = result.replace("{{members}}", classContent);

        return result; 
    }
    generateFile(className: string, tokens: IToken[]) : any {
        throw "Not Implemented";
        return "";    
    }        
    helper: ICodeGeneratorHelper;
}

export = CsharpGenerator;
