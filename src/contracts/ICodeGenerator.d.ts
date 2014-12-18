// <reference path="ICodeGeneratorHelper.d.ts" />
// <reference path="IToken.d.ts" />

interface ICodeGenerator {
    generate(className: string, tokens: IToken[]) : string;    
    generateFile(className: string, tokens: IToken[]) : any;
    helper: ICodeGeneratorHelper;
}
