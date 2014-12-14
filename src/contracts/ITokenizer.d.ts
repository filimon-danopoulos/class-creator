// <reference path="IToken.d.ts" />;
// <reference path="ITokenizerHelper.d.ts" />;
interface ITokenizer {
    tokinize(input: any) : IToken[];
    helper: ITokenizerHelper;  
}    
