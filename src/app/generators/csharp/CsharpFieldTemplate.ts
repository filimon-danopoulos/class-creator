/// <reference path="../../contracts/index.d.ts" />

class CsharpFieldTemplate implements ICodeTemplate {
    getTemplate(): string {
        return "{{accessor}} {{type}} {{name}};";    
    }
    getPlaceHolders(): string[] {
        var template = this.getTemplate();
        return template.match(/\{\{(.*?)\}\}/g).map(x => x.slice(2,-2));    
    }   
}

export = CsharpFieldTemplate;
