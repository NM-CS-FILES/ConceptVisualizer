import { type Color } from "$lib/types/Color";
import Rand from "rand-seed";

//
//

function randRange(min: number, max: number): number {
    return Math.floor((max - min) * Math.random()) + min;
}

//
//

export enum BookStyle {
    Plain,
    A,
    B,
    C,
    D
};

//
//

export class BookInfo {
    private static Colors:      Color[]  = [ "#8D544B", "#446463", "#AA483B", "#89969F", "#56565E", "#EFB561", "#749159", "#8E5053" ];
    private static WidthRange:  number[] = [ 24, 60 ];
    private static HeightRange: number[] = [ 145, 185 ];

    title: string;
    contents: string;

    width: number;
    height: number;
    depth: number;
    color: Color;
    style: string;

    constructor(title: string, contents: string) {
        const styleCount = Object.keys(BookStyle).length / 2;

        this.title = title;
        this.contents = contents;
        
        this.width  = randRange(BookInfo.WidthRange[0], BookInfo.WidthRange[1]);
        this.height = randRange(BookInfo.HeightRange[0], BookInfo.HeightRange[1]);
        this.depth  = randRange(this.height / 2, this.height * 3 / 4);

        this.color = BookInfo.Colors[Math.floor(Math.random() * BookInfo.Colors.length)];
        this.style = BookStyle[Math.floor(Math.random() * styleCount)];
    }

    static compare(a: BookInfo, b: BookInfo): number {
        return a.title.localeCompare(b.title);
    }
};