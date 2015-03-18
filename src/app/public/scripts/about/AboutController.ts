module App.About {
    
    export interface IAboutController {
        message: string;
    }

    export class AboutController extends Main.AngularController implements IAboutController {
        constructor() {
            this.message = "Testar om min koola grej fungerar!";
            super();
        }

        public message: string;
    }       
} 
