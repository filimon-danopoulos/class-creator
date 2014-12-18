// <reference path="../app/contracts/index.d.ts" />

class CsharpPropertyTemplate implements ICodeTemplate {
    getTemplate(): string {
        return "{{accessor}} {{type}} {{name}} { get; set; }"    
    }        
    getPlaceHolders(): string[] {
        var template = this.getTemplate();
        return template.match(/\{\{(.*?)\}\}/g).map(x => x.slice(2,-2));    
    }
}

export = CsharpPropertyTemplate;
