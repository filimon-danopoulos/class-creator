// <reference path="IToken.d.ts" />;
// <reference path="ITokenizerHelper.d.ts" />;
interface ITokenizer {
    tokenize(input: any) : ITokenizerResult[];
    helper: ITokenizerHelper;  
}    
