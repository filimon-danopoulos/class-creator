// <reference path="./ICodeGenerators.d.ts" />
// <reference path="./ITokeninzer.d.ts" />
// <reference path="./IParser.d.ts" />

interface ICodeService {
    getCodeAsString(data: any): string;
    getCodeAsStrings(data: any): string[];
    getCodeAsFile(data: any): any;
    getCodeAsFiles(data: any): any[];
    parser: IParser;
    tokenizer: ITokenizer;
    generator: ICodeGenerator;
}
