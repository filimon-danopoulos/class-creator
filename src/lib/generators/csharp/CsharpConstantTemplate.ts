/// <reference path="../../contracts/index.d.ts" />

class CsharpConstantTemplate implements ICodeTemplate {
    getTemplate(): string {
        return "{{accessor}} static readonly {{type}} {{name}};";    
    }
    getPlaceHolders(): string[] {
        var template = this.getTemplate();
        return template.match(/\{\{(.*?)\}\}/g).map(x => x.slice(2,-2));       
    }
}

export = CsharpConstantTemplate;
