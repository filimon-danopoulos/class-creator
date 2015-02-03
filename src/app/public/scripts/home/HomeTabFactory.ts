/// <reference path="./IHomeTab.d.ts" />

module App.Factory {
    export function homeTabFactory() {
        function createHomeTabs(): IHomeTab[] {
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

        return {
            createHomeTabs: createHomeTabs  
        };
    }    
}
