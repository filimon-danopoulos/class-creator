/// <reference path="./ICodeTemplate.d.ts" />
/// <reference path="./IToken.d.ts" />

interface ICodeTemplateFactory {
    getTemplate(member: IToken): ICodeTemplate;
}
