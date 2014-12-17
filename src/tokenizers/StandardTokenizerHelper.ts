// <reference path="./contracts/index.d.ts" />

export class StandardTokenizerHelper implements ITokenizerHelper {
    getName(propertyName: string) {  
        if (propertyName[0] === '_') {
            propertyName = propertyName.slice(1);
        }
        return propertyName;
    }  
    getType(propertyName: string, property: any) {
        switch (typeof property) {
            case "number": return "integer";
            case "string": return ((!isNaN(+property) && /[,.]/.test(property)) ? "float": "string");
            case "object": return (Array.isArray(property) ? "array" : propertyName);
            default: throw new Error("Unkown input");
        }
    }
    getAccessor(propertyName: string) {
        return propertyName[0] === '_' ? "private" : "public";
    }
    getConstruct(propertyName) {
        if (propertyName[0] === '_') {
            propertyName = propertyName.slice(1);    
        }

        if (propertyName.toUpperCase() === propertyName) {
            return "constant";    
        } else if (propertyName[0].toUpperCase() !== propertyName[0]) {
            return "field";
        } else {
            return "property";
        }
    }


}
