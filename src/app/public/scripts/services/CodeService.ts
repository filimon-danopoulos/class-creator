module App.Services {

    export enum CodeServiceLanguage {
        CSharp = 1,
        TypeScript
    }

    export interface ICodeService {
        getCodeStringFromJSON(method: Common.HTTPMethod, language: CodeServiceLanguage, json: string): ng.IPromise<string>;
        getAvailableLanguages(): [{ key: string, value: number }];
    }

    export class CodeService extends Main.AngularService implements ICodeService {
        public static $inject = ["$http", "$q"];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
            super();
        }
        public static serviceName: string = "codeService";

        public getCodeStringFromJSON(method: Common.HTTPMethod, language: CodeServiceLanguage, json: string): ng.IPromise<string> {
            var deferred: ng.IDeferred<{}>,
                success: (string) => void,
                error: (any) => void,
                delegate: (string) => ng.IPromise<any>;

            deferred = this.$q.defer();

            switch (language) {
                case CodeServiceLanguage.CSharp: delegate = this.getCsharpStringFromJSON; break;
                case CodeServiceLanguage.TypeScript: delegate = this.getTypeScriptStringFromJSON; break;
                default: throw Error("Unkown language provided!");
            }

            error = err => deferred.reject(err.Status + ": " + err.StatusText);
            success = resp => deferred.resolve(resp.data);

            switch (method) {
                case Common.HTTPMethod.GET: delegate(json).then(success, error); break;
                default: throw new Error("Not Implemented");
            }

            return deferred.promise;
        }

        public getAvailableLanguages(): [{ key: string, value: number }] {
            var result: [{ key: string, value: number }],
                key: string,
                value: number;

            result = <[{ key: string, value: number }]>[];

            for (var x in CodeServiceLanguage) {
                if (CodeServiceLanguage.hasOwnProperty(x) && typeof (CodeServiceLanguage[x]) === "number") {
                    key = x.replace(/Sharp$/, "#");
                    value = parseInt(CodeServiceLanguage[x], 10);
                    result.push({ key: key, value: value });
                }
            }

            return result;
        }


        private getCsharpStringFromJSON: (string) => ng.IPromise<any> = json => {
            return this.$http.get("/api/csharp/string/", {
                params: {
                    json: json
                }
            });
        };
        private getTypeScriptStringFromJSON: (string) => ng.IPromise<any> = json => {
            return this.$http.get("/api/typescript/string/", {
                params: {
                    json: json

                }
            });
        };
    }
}
