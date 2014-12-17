// <reference path="ICodeTemplate.d.ts" />
// <reference path="IToken.d.ts" />

interface ICodeGeneratorHelper {
    getTemplate(): ICodeTemplate;
    generateMember(member: IToken): string;
}
