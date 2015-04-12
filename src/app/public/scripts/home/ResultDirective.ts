module App.Home {
    export class ResultDirective implements Main.IDirective {
        public name: string = "appResult";
        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularDirective;
        }
        public factory(): ng.IDirective {
            return <ng.IDirective> {
                restrict: "E",
                templateUrl: "scripts/home/templates/Result.html",
                scope: {
                    result: "=",
                    reset: "&"
                }
            };
        }
    }
}
