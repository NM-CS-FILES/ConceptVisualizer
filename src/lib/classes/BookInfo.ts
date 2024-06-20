import { type Color } from "$lib/types/Color";
import Rand from "rand-seed";

export class BookInfo {
    private static Colors:      Color[]  = [ "#8D544B", "#446463", "#AA483B", "#89969F", "#56565E", "#EFB561", "#749159", "#8E5053" ];
    private static WidthRange:  number[] = [ 24, 60 ];
    private static HeightRange: number[] = [ 145, 185 ];

    title: string;
    width: number;
    height: number;
    color: Color;

    constructor(title: string) {
        // seed, deterministic
        const rand = new Rand(title);

        this.title = title;
        this.width = ((BookInfo.WidthRange[1] - BookInfo.WidthRange[0]) * rand.next()) + BookInfo.WidthRange[0];
        this.height = ((BookInfo.HeightRange[1] - BookInfo.HeightRange[0]) * rand.next()) + BookInfo.HeightRange[0];
        this.color = BookInfo.Colors[Math.floor(rand.next() * BookInfo.Colors.length)];
    }
};