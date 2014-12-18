// <reference path="./ICodeGenerators.d.ts" />
// <reference path="./ITokeninzer.d.ts" />
// <reference path="./IParser.d.ts" />

interface ICodeGeneratorService {
    new(parser: IParser, tokenizer: ITokenizer);
    getCodeAsString(data: any): string;
    getCodeAsStrings(data: any): string[];
    getCodeAsFile(data: any): any;
    getCodeAsFiles(data: any): any[];
    generator: ICodeGenerator;
    tokenizer: ITokenizer;
    parser: IParser;
}
