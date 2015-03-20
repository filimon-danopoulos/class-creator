interface ITokenizer {
    tokenize(input: any): ITokenizerResult[];
    helper: ITokenizerHelper;
}
