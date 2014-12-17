// <reference path="../contracts/index.d.ts" />

import CsharpClassTemplate = require("./CsharpClassTemplate");

class CsharpGeneratorHelper implements ICodeGeneratorHelper {
    getSkeleton(): ICodeTemplate {
        return new CsharpClassTemplate();
    }
    generateMember(member: IToken): string {
        throw "Not Implemented";
        return "";    
    }
}

export = CsharpGeneratorHelper;
