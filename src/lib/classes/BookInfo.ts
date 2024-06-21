import { type Color } from "$lib/types/Color";
import Rand from "rand-seed";

export class BookInfo {
    private static Colors:      Color[]  = [ "#8D544B", "#446463", "#AA483B", "#89969F", "#56565E", "#EFB561", "#749159", "#8E5053" ];
    private static WidthRange:  number[] = [ 24, 60 ];
    private static HeightRange: number[] = [ 145, 185 ];

    addr: number;
    value: number;

    width: number;
    height: number;
    color: Color;

    constructor(addr: number, value: number) {
        // seed, deterministic
        const rand = new Rand(value.toString());

        this.addr = addr;
        this.value = value;
        this.width = ((BookInfo.WidthRange[1] - BookInfo.WidthRange[0]) * rand.next()) + BookInfo.WidthRange[0];
        this.height = ((BookInfo.HeightRange[1] - BookInfo.HeightRange[0]) * rand.next()) + BookInfo.HeightRange[0];
        this.color = BookInfo.Colors[Math.floor(rand.next() * BookInfo.Colors.length)];
    }

    static compare(a: BookInfo, b: BookInfo): number {
        return a.addr - b.addr;
    }
};