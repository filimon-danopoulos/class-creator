class TokenizerResult implements ITokenizerResult {
    constructor(className, tokens) {
        this.className = className;
        this.tokens = tokens;
    }
    className: string;
    tokens: IToken[];
}

export = TokenizerResult;
