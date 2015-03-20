class Token implements IToken {
    constructor(name: string, type: string, construct: string, accessor: string) {
        this.name = name;
        this.type = type;
        this.construct = construct;
        this.accessor = accessor;
    }
    name: string;
    type: string;
    construct: string;
    accessor: string;
}

export = Token;
