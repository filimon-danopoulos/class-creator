module App.Home {
    export class ResultDirective extends Main.AngularDirective {
        public name: string = "appResult";
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
