import PythonMemberTemplate = require("./PythonMemberTemplate");
import PythonConstantTemplate = require("./PythonConstantTemplate");

class PythonTemplateFactory implements ICodeTemplateFactory {
    getTemplate(member: IToken): ICodeTemplate {
        switch (member.construct) {
            case "property": return new PythonMemberTemplate();
            case "field": return new PythonMemberTemplate();
            case "constant": return new PythonConstantTemplate();
            default: throw "Not implemented";
        }

    }
}

export = PythonTemplateFactory;
