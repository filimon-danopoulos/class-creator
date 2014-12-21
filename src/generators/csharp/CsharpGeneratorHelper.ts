// <reference path="../contracts/index.d.ts" />

import CsharpClassTemplate = require("./CsharpClassTemplate");
import CsharpTemplateFactory = require("./CsharpTemplateFactory");

class CsharpGeneratorHelper implements ICodeGeneratorHelper {
    constructor() {
        this.templateFactory = new CsharpTemplateFactory();
    }
    getTemplate(): ICodeTemplate {
        return new CsharpClassTemplate();
    }
    generateMember(token: IToken): string {
        var template = this.templateFactory.getTemplate(token);
        var templateString = template.getTemplate();
        var placeHolders = template.getPlaceHolders();
        for (var i = 0, iLen = placeHolders.length; i < iLen; i++) {
            var placeHolder = placeHolders[i];
            var parts = templateString.split("{{"+placeHolder+"}}");
            var value = token[placeHolder];    
            if(placeHolder === "type") {
                value = getType(value);    
            }
            templateString = [parts[0], value, parts[1]].join("");
        }

        return templateString; 
    }
    templateFactory: ICodeTemplateFactory
}

function getType(type: string): string {
    switch(type) {
        case "integer": return "int";
        case "float": return "float";
        case "string": return "string";
        default: return (type[0].toUpperCase() === type[0] ? type : type[0].toUpperCase()+type.slice(1));    
    }    
}

export = CsharpGeneratorHelper;
