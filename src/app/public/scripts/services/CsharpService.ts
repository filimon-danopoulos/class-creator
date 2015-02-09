/// <reference path="../../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./AngularService" />
/// <reference path="./ServiceMethod" />
/// <reference path="./ICsharpService" />

module App.Service {
    export class CsharpService extends AngularService implements ICsharpService {
        static $inject = ["$http"]; 
        constructor(private $http: ng.IHttpService ) {
            super()
        }
        public getCodeStringFromJSON(method: ServiceMethod, json: string): ng.IPromise<string> { 
            switch (method) {
                case ServiceMethod.GET:
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
