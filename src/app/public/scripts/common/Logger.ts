module App.Common {
    export interface ILogger {
        success(string): void;
        error(string): void;
        info(string): void;
        log(string): void;
        warn(string): void;
    }

    export class LoggerFactory implements Main.IFactory<ILogger> {
        public static $inject = ["$log", "toastr"];

        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularFactory;
        }

        public factory($log: ng.ILogService, toastr: Toastr): ILogger {
            return {
                success: (message: string): void => {
                    toastr.success(message, "Success!");
                },
                error: (message: string): void => {
                    toastr.error(message, "Oops...");
                },
                info: (message: string): void => {
                    toastr.info(message, "Information:");
                },
                warn: (message:string): void => {
                    toastr.warning(message, "Information:")
                },
                log: (message: string): void => {
                    $log.log(message);
                }
            };
        }
    }
}
