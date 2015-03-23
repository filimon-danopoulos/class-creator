import PythonGeneratorHelper = require("./PythonGeneratorHelper");

class PythonGenerator implements ICodeGenerator {
    constructor() {
        this.helper = new PythonGeneratorHelper();
    }
    generate(className: string, tokens: IToken[]) : string {
        var classTemplate: ICodeTemplate,
            staticMembers: string[],
            members: string[],
            token: IToken;

        classTemplate = this.helper.getTemplate()
        members = [];
        staticMembers = [];

        for (var i = 0, l = tokens.length; i < l; i++) {
            token = tokens[i];
            if(token.construct === "constant") {
                staticMembers.push(this.helper.generateMember(token));
            } else {
                members.push("    "+this.helper.generateMember(token));
            }
        }
        var classContent = members.concat(staticMembers).join("\n");
        var result = classTemplate.getTemplate();
        className = (className[0].toUpperCase() === className[0] ? className : className[0].toUpperCase()+className.slice(1));
        result = result.replace("{{className}}", className);
        result = result.replace("{{members}}", classContent);

        return result;

    }
    helper: ICodeGeneratorHelper;
}

export = PythonGenerator;
