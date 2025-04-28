export class Project {
    public Id!: string;
    public Title?: string;
    public Image?: string;
    public Price?: number;
    public Link?: string;
    public Complete?: string;
    public Items!: Project[];

    public static New = (data?: any): Project => ({
        Items: [],
        ...data,
    });
}