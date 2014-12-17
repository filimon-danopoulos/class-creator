// <reference path="../contracts/index.d.ts" />

import CsharpGeneratorHelper = require("./CsharpGeneratorHelper");

class CsharpGenerator implements ICodeGenerator {
    constructor() {
        this.helper = new CsharpGeneratorHelper();    
    } 
    generate(members: IToken[]) : string {
        throw "Not Implemented";
        return "";    
    }
    generateFile(members: IToken[]) : any {
        throw "Not Implemented";
        return "";    
    }        
    helper: ICodeGeneratorHelper;
}

export = CsharpGenerator;
