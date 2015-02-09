/// <reference path="./IAboutController" />

module App.Controller {
    export class AboutController implements IAboutController {
        constructor() {
            this.init();
        }
        public vm: App.Data.IAboutViewModel;

        private init() {
            this.vm = {
                message: "Testar om min koola grej fungerar!"
            };
        }
    }       
} 
