// <reference path="./contracts/index.d.ts" />
import Token = require("./Token");

class StandardTokenizerHelper implements ITokenizerHelper {
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
    
    getTokensForObject(input: any): ITokenizerResult {
        var result = {
            className: input.name,
            tokens: []
        }
        var value = input.value;
        for (var propertyName in value) {
            if (value.hasOwnProperty(propertyName)) {
                var property = value[propertyName];
                result.tokens.push(new Token(
                    this.getName(propertyName),
                    this.getType(propertyName, property),
                    this.getConstruct(propertyName),
                    this.getAccessor(propertyName)
                ));
            }
        }
        return result;
    } 

    
    getObjects(input: any): any[] {
        var result = [];
        var keys = Object.keys(input);
        for(var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            var value = input[key];
            if (typeof value === "object" && !Array.isArray(value)) {
                result.push({name: key, value: value});
                result = result.concat(this.getObjects(value));
            }
        }
        return result;
    }

}
export = StandardTokenizerHelper;
