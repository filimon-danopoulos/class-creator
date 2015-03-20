interface ICodeGenerator {
    generate(className: string, tokens: IToken[]) : string;
    helper: ICodeGeneratorHelper;
}
