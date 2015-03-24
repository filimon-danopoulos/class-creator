import PythonClassTemplate = require("./PythonClassTemplate");
import PythonTemplateFactory = require("./PythonTemplateFactory");

class PythonGeneratorHelper implements ICodeGeneratorHelper {
    constructor() {
        this.templateFactory = new PythonTemplateFactory();
    }
    getTemplate() {
        return new PythonClassTemplate();
    }

    generateMember(token: IToken): string {
        var template = this.templateFactory.getTemplate(token);
        var templateString = template.getTemplate();
        var placeHolders = template.getPlaceHolders();
        for (var i = 0, iLen = placeHolders.length; i < iLen; i++) {
            var placeHolder = placeHolders[i];
            var parts = templateString.split("{{" + placeHolder + "}}");
            var value = token[placeHolder];
            if (placeHolder === "type") {
                value = this.getType(value);
            }
            if (placeHolder === "accessor") {
                value = this.getAccessor(value);
            }
            templateString = [parts[0], value, parts[1]].join("");
        }

        return templateString;
    }

    getType(type: string): string {
        switch (type) {
            case "integer": return "1";
            case "float": return "1.0";
            case "string": return "\"\"";
            case "array": return "[]";
            case "boolean": return "False";
            default: return (type[0].toUpperCase() === type[0] ? type : type[0].toUpperCase() + type.slice(1));
        }
    }

    getAccessor(accessor: string): string {
        switch (accessor) {
            case "private": return "_";
            default: return "";
        }
    }

    templateFactory: ICodeTemplateFactory;
}

export = PythonGeneratorHelper;
