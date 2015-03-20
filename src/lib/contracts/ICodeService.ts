interface ICodeService {
    getCodeAsString(data: {[key: string]:string}): string;
    getCodeAsStrings(data: {[key: string]:string}): string[];
    parser: IParser;
    tokenizer: ITokenizer;
    generator: ICodeGenerator;
}
