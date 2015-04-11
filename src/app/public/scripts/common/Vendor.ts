module App.Common {
    export class ToastrValue extends Main.AngularValue<Toastr> {
        constructor() {
            super();
            toastr.options.closeButton = true;
        }

        public name: string = "toastr";
        public value(): Toastr {
            return toastr;
        }
    }
}
