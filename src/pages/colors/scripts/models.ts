export class Theme {
   public Name!: string;
   public PrimaryHue!: number;
   public OffsetHue!: number;
   public ColorsDark!: Color[];
   public ColorsLight!: Color[];
   public ColorBackground!: Color[];
   public ColorForeground!: Color[];
   public ColorBorder!: Color[];
   public ColorHighlight!: Color[];

   public static New = (data?: object): Theme => ({
      Name: "New Theme",
      PrimaryHue: 0,
      OffsetHue: 0,
      ColorsDark: Array.from({ length: 8 }, () => Color.New()),
      ColorsLight: Array.from({ length: 8 }, () => Color.New()),
      ColorBackground: Array.from({ length: 2 }, () => Color.New()),
      ColorForeground: Array.from({ length: 2 }, () => Color.New()),
      ColorBorder: Array.from({ length: 2 }, () => Color.New()),
      ColorHighlight: Array.from({ length: 2 }, () => Color.New()),
      ...data
   });
}
export class Color {
   public H!: number;
   public S!: number;
   public L!: number;
   public Primary!: boolean;

   public static New = (data?: object): Color => ({
      H: 0,
      S: 0,
      L: 0,
      Primary: false,
      ...data
   });
}