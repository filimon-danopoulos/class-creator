module App.Common {
    export class ToastrValue implements Main.IValue<Toastr> {
        constructor() {
            toastr.options.closeButton = true;
        }

        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularValue;
        }

        public name: string = "toastr";
        public value(): Toastr {
            return toastr;
        }
    }
}
