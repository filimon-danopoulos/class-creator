module Main {
    /// "Public" members" ///

    /**
    * Initializes the application, registers all modules and their components. It should be called before the main
    * module is initialized so that the resulting dependencies can be included in the module.
    * @param applicationNameSpace The namespace of the application, this should correspond to the base module in the app.
    * @return All the modules that have been registered so that they can be injected into the app.
    **/
    export function init(applicationNameSpace: string): string[] {
        var application, modules, currentModule,
            currentModuleName: string;

        application = window[applicationNameSpace];
        modules = Object.keys(application)
            .filter(key => application.hasOwnProperty(key) && typeof (application[key]) === "object");

        for (var i = 0, iMax = modules.length; i < iMax; i++) {
            currentModuleName = modules[i];
            currentModule = application[currentModuleName];
            registerModule(currentModule, currentModuleName);
        }

        return modules;
    }

    export interface IAngularComponent {
        getComponentType(): ComponentType
    }

    export class AngularService implements IAngularComponent {
        public getComponentType(): ComponentType {
            return ComponentType.AngularService;
        }
        public static serviceName: string;
    }

    export class AngularFactory<T> implements IAngularComponent {
        public getComponentType(): ComponentType {
            return ComponentType.AngularFactory;
        }
        public factory(...dependencies: any[]): T {
            throw new Error("No factory method in AngularFactory sub-class. All sub-classes must implement factory.")
        }
    }

    export class AngularDirective extends AngularFactory<ng.IDirective> {
        public name: string;
        public getComponentType(): ComponentType {
            return ComponentType.AngularDirective
        }
    }

    export class AngularController implements IAngularComponent {
        public getComponentType(): ComponentType {
            return ComponentType.AngularController;
        }
    }

    export class AngularValue<T> implements IAngularComponent {
        public getComponentType(): ComponentType {
            return ComponentType.AngularValue;
        }
        public name: string;
        public value(): T {
            return null;
        }
    }

    export enum ComponentType {
        AngularService,
        AngularFactory,
        AngularController,
        AngularValue,
        AngularDirective
    }

    /// Implementation Details ///

    /**
    * Responsible for registering an entire module.
    * @param applicationModule The module to register any angular compoments from.
    **/
    function registerModule(applicationModule: any, moduleName: string): void {
        var moduleMembers: string[], angularModule: any;

        moduleMembers = Object.keys(applicationModule)
            .filter(x => applicationModule.hasOwnProperty(x) && typeof (applicationModule[x]) === "function");
        angularModule = angular.module(moduleName, []);

        for (var i = 0, iMax = moduleMembers.length; i < iMax; i++) {
            registerComponent(angularModule, applicationModule, moduleMembers[i]);
        }
    }

    /**
    * Registers an individual angular component
    * @param angularModule The angular module the component belongs to
    * @param applicationModule The parent application module.
    * @param componentName The name of the component to register.
    **/
    function registerComponent(angularModule: any, applicationModule: any, componentName: string): void {
        var component: any,
            componentType: ComponentType;

        component = applicationModule[componentName];
        if (typeof (component.prototype.getComponentType) !== "function") {
            return;
        }

        componentType = component.prototype.getComponentType();

        switch (componentType) {
            case ComponentType.AngularService:
                registerService(angularModule, componentName, component);
                break;
            case ComponentType.AngularFactory:
                registerFactory(angularModule, componentName, component);
                break;
            case ComponentType.AngularController:
                registerController(angularModule, componentName, component);
                break;
            case ComponentType.AngularValue:
                registerValue(angularModule, componentName, component);
                break;
            case ComponentType.AngularDirective:
                registerDirective(angularModule, componentName, component);
                break;
        }
    }

    /**
    * Registers an Angular service with angular
    * @param module The angular module the service belongs to.
    * @param serviceComponent The Agnular serice to register.
    **/
    function registerService(angularModule: any, componentName: string, serviceComponent: any): void {
        var serviceName = serviceComponent.serviceName;
        if (!serviceName) {
            throw new Error(componentName + " does not provide the static property serviceName.");
        }
        angularModule.config(["$provide", ($provide) => $provide.service(serviceName, serviceComponent)]);
    }

    /**
    * Registers an Angular factory with Angular
    * @param module The angular the factory belongs to.
    * @param factoryName The name of the factory class.
    * @param factoryComponent The Angular factory to register.
    **/
    function registerFactory(angularModule: any, factoryName: string, factoryComponent: any): void {
        var factoryRegistrationName: string,
            factoryContainer: AngularFactory<any>;
        factoryContainer = new factoryComponent();
        // Since we are leaving angular convention slightly with factories and are utilizing classes,
        // the names of factories need to be adjusted slightly.
        factoryRegistrationName = factoryName[0].toLowerCase() + factoryName.slice(1);
        // Remove any "Factory" suffix
        factoryRegistrationName = factoryRegistrationName.replace(/[fF]actory$/, "");
        if (factoryComponent.$inject) {
            factoryContainer.factory.$inject = factoryComponent.$inject;
        }
        angularModule.config(["$provide", ($provide) => $provide.factory(factoryRegistrationName, factoryContainer.factory)]);
    }

    /**
    * Registers an Angular controller with Angular
    * @param angularModule The angular module the controller belongs to.
    * @param controllerName The name the controller will be registered with.
    * @param controllerComponent The Angular controller to register.
    **/
    function registerController(angularModule: any, controllerName: string, controllerComponent: any): void {
        angularModule.config(["$controllerProvider", ($controllerProvider) =>
            $controllerProvider.register(controllerName, controllerComponent)
        ]);
    }

    /**
    * Register an Angular value with Angular
    * @param angularModule The angular module the value belongs to
    * @param valueName The name of the value
    * @param valueComponent The value component to register.
    **/
    function registerValue(angularModule: any, valueName: string, valueComponent: any): void {
        var valueInstance: AngularValue<any>,
            name: string,
            value: any;

        valueInstance = <AngularValue<any>> new valueComponent();
        name = valueInstance.name;
        value = valueInstance.value();

        if (!name) {
            throw new Error(valueName + " does not provide a name property");
        }
        if (!value) {
            throw new Error(valueName + " does not propvide a value property");
        }

        angularModule.config(["$provide", ($provide) => $provide.value(name, value)]);
    }


    function registerDirective(angularModule: any, directiveName: string, directiveComponent: any): void {
        var directiveContainer: AngularDirective;
        directiveContainer = new directiveComponent();
        if (directiveComponent.$inject) {
            directiveContainer.factory.$inject = directiveComponent.$inject;
        }
        angularModule.config(["$compileProvider", ($compileProvider) =>
            $compileProvider.directive(directiveContainer.name, directiveContainer.factory)
        ]);
    }

}
