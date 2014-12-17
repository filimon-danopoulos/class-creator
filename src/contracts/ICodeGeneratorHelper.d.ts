// <reference path="ICodeTemplate.d.ts" />
// <reference path="IToken.d.ts" />
// <reference path="ICodeTemplateFactory.d.ts" />

interface ICodeGeneratorHelper {
    getTemplate(): ICodeTemplate;
    generateMember(member: IToken): string;
    templateFactory: ICodeTemplateFactory
}
