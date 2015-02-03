/// <reference path="../Main.ts" />

module App.Controller {
    interface IAboutScope {
        message: string;
    }

    export class AboutController implements IAboutScope {
        constructor() {
            this.init();
        }
        public message: string;

        private init() {
            this.message = "Testar om min koola grej fungerar!";
        }
    }       
} 
