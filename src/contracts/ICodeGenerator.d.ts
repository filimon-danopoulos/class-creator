// <reference path="ICodeGeneratorHelper.d.ts" />
// <reference path="IToken.d.ts" />

interface ICodeGenerator {
    generate(members: IToken[]) : string;    
    generateFile(members: IToken[]) : any;
    helper: ICodeGeneratorHelper;
}
