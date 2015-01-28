/// <reference path="../../../../thirdparty/angular/angular-all.d.ts" />
/// <reference path="./AngularService.ts" />
/// <rererence path="./ServiceMethod.ts" />

module App.Service {
    export class CsharpService extends AngularService { 
        constructor($http: ng.IHttpService ) {
            this.http = $http;
            super()
        }
        private http;
        private getCodeStringFromJSON(method: ServiceMethod, json: string): ng.IPromise<string> { 
            switch (method) {
                case ServiceMethod.GET:
                    return this.http.get("/api/csharp/string/", {
                        params: {
                            json: json    
                        }
                    });
                default: throw "Not Implemented";    
            }
        }
        public test(): string {
            return "Hello";    
        }
    }    
}
