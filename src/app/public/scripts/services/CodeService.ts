module App.Services {

    export interface ICodeService {
        getCodeStringFromJSON(method: Common.ServiceMethod, json: string): ng.IPromise<string>;
    }

    export class CodeService extends Main.AngularService implements ICodeService {
        public static $inject = ["$http", "$q"];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService ) {
            super()
        }
        public static serviceName: string = "codeService";

        public getCodeStringFromJSON(method: Common.ServiceMethod, json: string): ng.IPromise<string> {
            var deferred = this.$q.defer(),
                success = resp => deferred.resolve(resp.data),
                error = err => deferred.reject(err.Status+": "+err.StatusText);
            switch (method) {
                case Common.ServiceMethod.GET:
                    this.getCsharpStringFromJSON(json).then(success, error);
                    break;
                default: throw new Error("Not Implemented");
            }
            return deferred.promise;
        }


        private getCsharpStringFromJSON(json: string): ng.IPromise<any> {
            return this.$http.get("/api/csharp/string/", {
                params: {
                    json: json
                }
            });
        }
    }
}
