class TypeScriptClassTemplate implements ICodeTemplate {

    getTemplate(): string {
        return [
            "class {{className}} {",
                "{{members}}",
            "}"
        ].join('\n')
    }
    getPlaceHolders(): string[] {
        var template = this.getTemplate();
        return template.match(/\{\{(.*?)\}\}/g).map(x => x.slice(2,-2));
    }
}

export = TypeScriptClassTemplate;
