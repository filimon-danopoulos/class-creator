/// <reference path="../../../../thirdparty/angular/angular-all.d.ts" />

module App.Services {

    export interface ICsharpService {
        getCodeStringFromJSON(method: Common.ServiceMethod, json: string): ng.IPromise<string>;
    }

    export class CsharpService extends Main.AngularService implements ICsharpService {
        public static $inject = ["$http"];
        constructor(private $http: ng.IHttpService ) {
            super()
        }
        public static serviceName: string = "csharpService";

        public getCodeStringFromJSON(method: Common.ServiceMethod, json: string): ng.IPromise<string> {
            switch (method) {
                case Common.ServiceMethod.GET:
                    return this.$http.get("/api/csharp/string/", {
                        params: {
                            json: json
                        }
                    });
                default: throw "Not Implemented";
            }
        }
    }
}
