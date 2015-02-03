/// <reference path="./IAboutController.d.ts" />

module App.Controller {
    export class AboutController implements IAboutController {
        constructor() {
            this.init();
        }
        public vm: IAboutViewModel;

        private init() {
            this.vm = {
                message: "Testar om min koola grej fungerar!"
            };
        }
    }       
} 
