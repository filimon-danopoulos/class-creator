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
                
            templateString = [parts[0], token[placeHolder], parts[1]].join("");
        }

        return templateString; 
    }
    templateFactory: ICodeTemplateFactory
}

export = CsharpGeneratorHelper;
