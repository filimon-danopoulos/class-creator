/// <reference path="../../contracts/index.d.ts" />

import TypeScriptClassTemplate = require("./TypeScriptClassTemplate");
import TypeScriptTemplateFactory = require("./TypeScriptTemplateFactory");

class TypeScriptGeneratorHelper implements ICodeGeneratorHelper {
    constructor() {
        this.templateFactory = new TypeScriptTemplateFactory();
    }
    getTemplate() {
        return new TypeScriptClassTemplate();
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
                value = this.getType(value);    
            }
            templateString = [parts[0], value, parts[1]].join("");
        }

        return templateString; 
    }
    getType(type: string): string {
        switch(type) {
            case "integer": return "number";
            case "float": return "number";
            case "string": return "string";
            case "array": return "any[]";
            case "boolean": return "boolean";
            default: return (type[0].toUpperCase() === type[0] ? type : type[0].toUpperCase()+type.slice(1));    
        }    
    }

    templateFactory: ICodeTemplateFactory;
}

export = TypeScriptGeneratorHelper;
