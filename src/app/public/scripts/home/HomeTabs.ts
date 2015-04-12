module App.Home {

    export class HomeTabs implements Main.IValue<IHomeTab[]> {
        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularValue;
        }
        public name: string = "tabs";
        public value(): IHomeTab[] {
            return [{
                title: "Define JSON",
                description: "Define your own JSON and generate code.",
                partial: "scripts/home/templates/JSONForm.html"
            }, {
                title: "Simple URL",
                description: "Point the app to an URL that represents a JSON endpoint.",
                partial: "scripts/home/templates/SimpleURLForm.html",
                disabled: true
            }];
        }
    }
}
