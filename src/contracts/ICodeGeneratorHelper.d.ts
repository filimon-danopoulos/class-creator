interface ICodeGeneratorHelper {
    getSkeleton() : string;
    generateMember(member: string) : string;
    addMember(member: string, skeleton: string) : string;    
}
