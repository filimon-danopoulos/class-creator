module App.Common {
    export interface ILogger {
        success(string): void;
        error(string): void;
        info(string): void;
        log(string): void;
    }

    export class Logger extends Main.AngularFactory<ILogger> implements ILogger {
        public factory(): ILogger {
            return this;
        }

        public success(message: string): void {
            console.log(message);
        }

        public error(message: string): void {
            console.log(message);
        }

        public info(message: string): void {
            console.log(message);
        }

        public log(message: string): void {
            console.log(message);
        }
    }
}
