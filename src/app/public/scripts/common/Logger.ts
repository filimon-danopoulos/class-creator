module App.Common {
    export interface ILogger {
        success(string): void;
        error(string): void;
        info(string): void;
        log(string): void;
    }

    export class LoggerFactory extends Main.AngularFactory<ILogger> {
        public static $inject = ["$log", "toastr"];
        public factory($log: ng.ILogService, toastr: Toastr): ILogger {
            return {
                success: (message: string): void => {
                    toastr.success(message, "Success!");
                },
                error: (message: string): void => {
                    toastr.error(message, "Oops...");
                },
                info: (message: string): void => {
                    toastr.info(message, "Information:.");
                },
                log: (message: string): void => {
                    $log.log(message);
                }
            };
        }
    }
}
