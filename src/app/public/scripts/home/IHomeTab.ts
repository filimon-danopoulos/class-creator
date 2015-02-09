module App.Data {
    export interface IHomeTab {
        title: string;
        description: string;
        partial: string;
        active?: boolean;
        disabled?: boolean;    
    }
}
