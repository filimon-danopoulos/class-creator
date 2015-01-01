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
        className = (className[0].toUpperCase() === className[0] ? className : className[0].toUpperCase()+className.slice(1));
        result = result.replace("{{className}}", className);
        result = result.replace("{{members}}", classContent);

        return result; 
    }
    helper: ICodeGeneratorHelper;
}

export = CsharpGenerator;
