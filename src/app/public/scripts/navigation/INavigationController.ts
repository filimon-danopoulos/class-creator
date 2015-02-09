module App.Controller {
    export interface INavigationController {
        isActive: (hash: string) => boolean;    
    }
}
