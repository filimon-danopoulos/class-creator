import TypeScriptMemberTemplate = require("./TypeScriptMemberTemplate");
import TypeScriptConstantTemplate = require("./TypeScriptConstantTemplate");

class TypeScriptTemplateFactory implements ICodeTemplateFactory {
    getTemplate(member: IToken): ICodeTemplate {
        switch (member.construct) {
            case "property": return new TypeScriptMemberTemplate();
            case "field": return new TypeScriptMemberTemplate();
            case "constant": return new TypeScriptConstantTemplate();
            default: throw "Not implemented";
        }

    }
}

export = TypeScriptTemplateFactory;
