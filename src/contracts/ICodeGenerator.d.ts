// <reference path="ICodeGeneratorHelper.d.ts" />
// <reference path="IToken.d.ts" />

interface ICodeGenerator {
    generate(className: string, tokens: IToken[]) : string;    
    helper: ICodeGeneratorHelper;
}
