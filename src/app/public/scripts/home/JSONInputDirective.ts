module App.Common {
    export class JSONInputDiretive implements Main.IDirective {
        public name: string = "appJsonInput";
        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularDirective;
        }
        public factory(): ng.IDirective {
            return <ng.IDirective> {
                restrict: 'E',
                scope: {
                    json: "="
                },
                templateUrl: "scripts/home/templates/JSONInput.html",
                link: function(scope: ng.IScope, element: ng.IAugmentedJQuery) {
                    var textarea = element.find('textarea');
                    textarea.bind('keydown', function(event) {
                        if (event.which == 9) {
                            event.preventDefault();
                            var start = this.selectionStart;
                            var end = this.selectionEnd;
                            textarea.val(textarea.val().substring(0, start) + '    ' + textarea.val().substring(end));
                            this.selectionStart = this.selectionEnd = start + 4;
                            textarea.triggerHandler('change');
                        }
                    });
                }
            };
        }
    }
}
