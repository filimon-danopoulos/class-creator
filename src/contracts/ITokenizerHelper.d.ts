interface ITokenizerHelper {
    getName(propertyName: string): string;
    getType(propertyName: string, property:any): string;
    getAccessor(propertyName: string): string;
    getConstruct(propertName: string): string;    
}
