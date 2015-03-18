declare var angular;

module TypeGular {
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
            .filter(key => application.hasOwnProperty(key));

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
        getComponentType(): ComponentType {
            return ComponentType.AngularService;
        }
        getServiceName(): string {
            if (this.serviceName) {
                return this.serviceName;
            }
            throw new Error("No serviceName provided for AngularService sub-class. Please add a serviceName property.");
        }
        serviceName: string;
    }

    export class AngularFactory<TIn, TOut> implements IAngularComponent {
        getComponentType(): ComponentType {
            return ComponentType.AngularFactory;
        }
        factory(dependencies: TIn): TOut {
            throw new Error("No factory method implementation in AngularFactory sub-class. All sub-classes must implement factory.")
        }
    }

    export class AngularController implements IAngularComponent {
        getComponentType(): ComponentType {
            return ComponentType.AngularController;
        }
    }

    export class AngularValue implements IAngularComponent {
        getComponentType(): ComponentType {
            return ComponentType.AngularValue;
        }
    }

    export enum ComponentType {
        AngularService,
        AngularFactory,
        AngularController,
        AngularValue
    }

    /// Implementation Details ///

    /**
    * Responsible for registering an entire module.
    * @param module The module to register any angular compoments from.
    **/
    function registerModule(module: any, moduleName: string): void {
        var moduleMembers: string[], angularModule: any;

        moduleMembers = Object.keys(module).filter(x => module.hasOwnProperty(x));
        angularModule = angular.module(moduleName, []);

        for (var i = 0, iMax = moduleMembers.length; i < iMax ; i++) {
            registerComponent(angularModule, moduleMembers[i]);
        }
    }

    /**
    * Registers an individual angular component
    * @param module The parent angular module.
    * @param componentName The name of the component to register.
    **/
    function registerComponent(module: any, componentName: string): void {
        var component: IAngularComponent,
            componentType: ComponentType;

        component = <IAngularComponent> module[componentName];
        if (typeof(component.getComponentType) !== "function") {
            return;
        }

        componentType = component.getComponentType();

        switch (componentType) {
            case ComponentType.AngularService: registerService(module, <AngularService> component); break;
            case ComponentType.AngularFactory: registerFactory(module, componentName, <AngularFactory<any, any>> component); break;
            case ComponentType.AngularController: registerController(module, componentName, <AngularController> component); break;
            case ComponentType.AngularValue: registerValue(module, componentName, <AngularValue> component); break;
        }
    }

    /**
    * Registers an Angular service with angular
    * @param module The angular module the service belongs to.
    * @param serviceComponent The Agnular serice to register.
    **/
    function registerService(angularModule: any, serviceComponent: AngularService): void {
        var serviceName = serviceComponent.getServiceName();
        angularModule.config(["$provide", ($provide) => $provide.service(serviceName, serviceComponent)]);
    }

    /**
    * Registers an Angular factory with Angular
    * @param module The angular the factory belongs to.
    * @param factoryName The name of the factory class.
    * @param factoryComponent The Angular factory to register.
    **/
    function registerFactory(angularModule: any, factoryName: string, factoryComponent: AngularFactory<any, any>): void {
        var factoryRegistrationName : string;
        // Since we are leaving angular convention slightly with factories and are utilizing classes,
        // the names of factories need to be adjusted slightly.
        factoryRegistrationName= factoryName[0].toUpperCase() + factoryName.slice(1);
        angularModule.config(["$provide", ($provide) => $provide.factory(factoryRegistrationName, factoryComponent.factory)]);
    }

    /**
    * Registers an Angular controller with Angular
    * @param angularModule The angular module the controller belongs to.
    * @param controllerName The name the controller will be registered with.
    * @param controllerComponent The Angular controller to register.
    **/
    function registerController(angularModule: any, controllerName: string, controllerComponent: AngularController): void {
        angularModule.config(["$controllerProvider", ($controllerProvider) => $controllerProvider.register(controllerName, controllerComponent)]);
    }

    /**
    * Register an Angular value with Angular
    * @param angularModule The angular module the value belongs to
    * @param valueName The name of the value
    * @param valueComponent The value component to register.
    **/
    function registerValue(angularModule: any, valueName: string, valueComponent: AngularValue): void {
        angularModule.config(["$provide", ($provide) => $provide.value(valueName, valueComponent)]);
    }

}
