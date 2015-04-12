module App.Home {
    export interface IJSONFromController extends Main.IController {
        submitJSON(): void;
        hasResult(): boolean;
        reset(): void;

        isFormatActive(): boolean;
        isSubmitActive(): boolean;

        JSONInput: string;
        languageInput: string;
        availableLanguages: [{ key: string, value: number }];
    }

    export class JSONFormController implements IJSONFromController {
        public static $inject = ["codeService", "logger"];
        constructor(
            private codeService: App.Services.ICodeService,
            private logger: App.Common.ILogger
            ) {
            this.availableLanguages = this.codeService.getAvailableLanguages();
        }

        public getComponentType(): Main.ComponentType {
            return Main.ComponentType.AngularController;
        }

        public JSONInput: string;
        public result: string;
        public languageInput: string;
        public availableLanguages: [{ key: string, value: number }];

        public isFormatActive(): boolean {
            return !!this.JSONInput;
        }

        public isSubmitActive(): boolean {
            return !!this.JSONInput && !!this.languageInput
        }

        public hasResult(): boolean {
            return !!this.result;
        }

        public submitJSON(): void {
            var languageInputNo: number;
            languageInputNo = parseInt(this.languageInput, 10);

            this.codeService.getCodeStringFromJSON(Common.HTTPMethod.GET, languageInputNo, this.JSONInput)
                .then(result => {
                var language: string;

                language = this.availableLanguages
                    .filter(x => x.value === languageInputNo)
                    .shift()
                .key;

                this.result = result;
                this.logger.success(language + " class generated!");
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
                this.logger.info("JSON successfully formated.")
            }
        }

        public reset(): void {
            this.result = null;
            this.logger.warn("Result cleared.")
        }
    }
}
