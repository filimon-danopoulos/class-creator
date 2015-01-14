/// <reference path="../../contracts/index.d.ts" />

import TypeScriptMemberTemplate = require("./TypeScriptMemberTemplate");

class TypeScriptTemplateFactory implements ICodeTemplateFactory {
    getTemplate(member: IToken): ICodeTemplate {
        switch (member.construct) {
            case "property": return new TypeScriptMemberTemplate();
            case "field": return new TypeScriptMemberTemplate();
            case "constant": return new TypeScriptMemberTemplate();
            default: throw "Not implemented";
        }    
        
    }   
}

export = TypeScriptTemplateFactory;
