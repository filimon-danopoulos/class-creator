module App.About {

    export interface IAboutController {
        message: string;
    }

    export class AboutController extends Main.AngularController implements IAboutController {
        constructor() {
            super();
            this.message = "Testar om min koola grej fungerar!";
        }

        public message: string;
    }
}
