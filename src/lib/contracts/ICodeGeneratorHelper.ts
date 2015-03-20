interface ICodeGeneratorHelper {
    getTemplate(): ICodeTemplate;
    generateMember(token: IToken): string;
    getType(type:string): string;
    templateFactory: ICodeTemplateFactory;
}
