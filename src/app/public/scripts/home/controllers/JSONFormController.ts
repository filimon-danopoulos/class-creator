module App.Home {
    export interface IJSONFromController {
        submitJSON(): void;
        JSONInput: string;
        hasResult(): boolean;
        reset(): void;
    }

    export class JSONFormController extends Main.AngularController {
        public static $inject = ["codeService", "logger"];
        constructor(
            private codeService: App.Services.ICodeService,
            private logger: App.Common.ILogger
            ) {
            super();
        }

        public JSONInput: string;
        public result: string;

        public hasResult(): boolean {
            return !!this.result;
        }

        public submitJSON(): void {
            this.codeService.getCodeStringFromJSON(Common.ServiceMethod.GET, this.JSONInput)
                .then(result => {
                    this.result = result;
                    this.logger.success("Class generated!");
                }, error => this.logger.error("Could not retrieve class with the provided JSON."));
        }

        public formatJSON(): void {
            var inputString: string,
                obj: any;
            inputString = this.JSONInput;
            if (inputString) {
                try {
                    obj = JSON.parse(inputString);
                } catch (ex) {
                    this.logger.error("Invalid json.")
                }
            }
            if (obj) {
                this.JSONInput = JSON.stringify(obj, null, 4);
                this.logger.info("JSON formated!")
            }
        }

        public reset(): void {
            this.result = null;
        }
    }
}
