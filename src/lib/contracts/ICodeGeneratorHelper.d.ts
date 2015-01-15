/// <reference path="ICodeTemplate.d.ts" />
/// <reference path="IToken.d.ts" />
/// <reference path="ICodeTemplateFactory.d.ts" />

interface ICodeGeneratorHelper {
    getTemplate(): ICodeTemplate;
    generateMember(token: IToken): string;
    getType(type:string): string;
    templateFactory: ICodeTemplateFactory;
}
