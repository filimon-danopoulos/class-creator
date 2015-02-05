/// <reference path="../../../../thirdparty/angular/angular-all.d.ts" />
/// <rererence path="./ServiceMethod.ts" />

module App.Service {
    export interface ICsharpService {
        getCodeStringFromJSON(method: ServiceMethod, json: string): ng.IPromise<string>;
    }
}
