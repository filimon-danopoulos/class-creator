// <reference path="../contracts/index.d.ts" />

class Token implements IToken {
    constructor(name: string, type: string, construct: string, accessor: string, parentName: string) {
        this.name = name;
        this.type = type;
        this.construct = construct;
        this.accessor = accessor;
        this.parentName = parentName;    
    }
    name: string;
    type: string;
    construct: string;
    accessor: string;
    parentName: string;    
}

export = Token;
