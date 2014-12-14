interface ITokenizerHelper {
    getName(propertyName: string): string;
    getType(property:any): string;
    getAccessor(propertyName: string): string;
    getConstruct(propertName: string): string;    
}
