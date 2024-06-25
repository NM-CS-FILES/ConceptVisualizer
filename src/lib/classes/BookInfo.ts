import { type Color } from "$lib/types/Color";
import Rand from "rand-seed";

//
//

function randRange(min: number, max: number): number {
    return Math.floor((max - min) * Math.random()) + min;
}

//
//

export type BookStyle = "plain" | "a" | "b" | "c" | "d";
export type BookState = "upright" | "closed" | "open";

//
//

export class BookInfo {
    private static Colors:      Color[]     = [ "#8D544B", "#446463", "#AA483B", "#89969F", "#56565E", "#EFB561", "#749159", "#8E5053" ];
    private static WidthRange:  number[]    = [ 24, 60 ];
    private static HeightRange: number[]    = [ 145, 185 ];
    private static Styles:      BookStyle[] = [ "plain", "a", "b", "c", "d" ];

    public title: string;
    public contents: string;

    public width: number;
    public height: number;
    public depth: number;
    public color: Color;
    public style: BookStyle;

    public constructor(title: string, contents: string) {
        this.title = title;
        this.contents = contents;
        
        this.width  = randRange(BookInfo.WidthRange[0], BookInfo.WidthRange[1]);
        this.height = randRange(BookInfo.HeightRange[0], BookInfo.HeightRange[1]);
        this.depth  = randRange(this.height / 2, this.height * 3 / 4);
        this.color  = BookInfo.Colors[randRange(0, BookInfo.Colors.length)];
        this.style  = BookInfo.Styles[randRange(0, BookInfo.Styles.length)];
    }

    public static compare(a: BookInfo, b: BookInfo): number {
        return a.title.localeCompare(b.title);
    }
};