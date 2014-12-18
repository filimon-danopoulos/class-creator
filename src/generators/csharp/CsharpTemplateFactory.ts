// <reference path="../contracts/index.d.ts" />

import CsharpPropertyTemplate = require("./CsharpPropertyTemplate");
import CsharpFieldTemplate = require("./CsharpFieldTemplate");

class CsharpTemplateFactory implements ICodeTemplateFactory {
    getTemplate(member: IToken): ICodeTemplate {
        switch (member.construct) {
            case "property": return new CsharpPropertyTemplate();
            case "field": return new CsharpFieldTemplate();
            default: throw "Not implemented";
        }    
        
    }   
}

export = CsharpTemplateFactory;
