import type { Position } from "$lib/types/Position";
import type { Color } from "$lib/types/Color";

export class CircularNode {
    position: Position;
    radius: number;
    color: Color;
    label: (string | number);

    constructor (
        position: Position,
        radius: number,
        color: Color,
        label: (string | number) = ""
    ) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.label = label;
    }
}