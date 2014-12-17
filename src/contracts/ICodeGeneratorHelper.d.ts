// <reference path="ICodeTemplate.d.ts" />
// <reference path="IToken.d.ts" />

interface ICodeGeneratorHelper {
    getSkeleton(): ICodeTemplate;
    generateMember(member: IToken): string;
}
