module App.About {

    export interface IAboutController extends Main.IController {
        message: string;
    }

    export class AboutController implements IAboutController {
        constructor() {
            this.message = "Testar om min koola grej fungerar!";
        }

        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularController
        }

        public message: string;
    }
}
