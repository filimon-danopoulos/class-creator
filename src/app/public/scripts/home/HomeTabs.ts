module App.Home {

    export class HomeTabs extends Main.AngularValue<IHomeTab[]> {
        getValue(): IHomeTab[] {
            return [{
                title: "Define JSON",
                description: "Provide your own JSON", 
                partial: "views/home/JSONForm.html"
            }, {
                title: "Simple URL",
                description: "Point the app to an URL that represents a JSON endpoint.",
                partial: "views/home/SimpleURLForm.html"
            }];    
        }
    }
}
