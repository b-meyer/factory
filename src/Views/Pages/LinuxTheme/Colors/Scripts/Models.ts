export class Theme {
    public Name!: string;
    public PrimaryHue!: number;
    public ColorsDark!: Color[];
    public ColorsLight!: Color[];
    public ColorBackground!: Color[];
    public ColorForeground!: Color[];
    public ColorBorder!: Color[];
    public ColorHighlight!: Color[];

    public static New = (data?: any): Theme => ({
        Name: "New Theme",
        PrimaryHue: 0,
        ColorsDark: Array.from({length: 8}, x => Color.New()),
        ColorsLight: Array.from({length: 8}, x => Color.New()),
        ColorBackground: Array.from({length: 2}, x => Color.New()),
        ColorForeground: Array.from({length: 2}, x => Color.New()),
        ColorBorder: Array.from({length: 2}, x => Color.New()),
        ColorHighlight: Array.from({length: 2}, x => Color.New()),
        ...data
    });
}
export class Color {
    public H!: number;
    public S!: number;
    public L!: number;
    public Primary!: boolean;

    public static New = (data?: any): Color => ({
        H: 0,
        S: 0,
        L: 0,
        Primary: false,
        ...data
    });
}