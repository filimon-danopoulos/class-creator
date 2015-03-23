class PythonMemberTemplate implements ICodeTemplate {
    getTemplate(): string {
        return "{{accessor}}{{name}}={{type}}";
    }
    getPlaceHolders(): string[] {
        var template = this.getTemplate();
        return template.match(/\{\{(.*?)\}\}/g).map(x => x.slice(2,-2));
    }
}

export = PythonMemberTemplate;
