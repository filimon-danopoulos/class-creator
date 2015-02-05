/// <reference path="../../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./AngularService.ts" />
/// <reference path="./ServiceMethod.ts" />
/// <reference path="./ICsharpService.ts" />

module App.Service {
    export class CsharpService extends AngularService implements ICsharpService {
        /* @ngInject */ 
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
