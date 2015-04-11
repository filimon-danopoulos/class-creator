module App.Home {

    export class HomeTabs extends Main.AngularValue<IHomeTab[]> {
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
