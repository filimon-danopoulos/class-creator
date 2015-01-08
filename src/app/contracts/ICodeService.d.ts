// <reference path="./ICodeGenerators.d.ts" />
// <reference path="./ITokeninzer.d.ts" />
// <reference path="./IParser.d.ts" />

interface ICodeService {
    getCodeAsString(data: {[key: string]:string}): string;
    getCodeAsStrings(data: {[key: string]:string}): string[];
    parser: IParser;
    tokenizer: ITokenizer;
    generator: ICodeGenerator;
}
