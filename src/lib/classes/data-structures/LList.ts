
type LLNodeRef<T> = (LLNode<T> | null)

export class LLNode<T> {
    value: T;
    next: LLNodeRef<T>;
    prev: LLNodeRef<T>;

    constructor(
        value: any, 
        next: LLNodeRef<T> = null, 
        prev: LLNodeRef<T> = null
    ) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

export class LList<T> {
    private size: number;
    private front: LLNodeRef<T>;
    private back: LLNodeRef<T>;

    constructor() {
        this.size = 0;
        this.front = null;
        this.back = null;
    }

    private removeNode(node: LLNode<T>): void {
        let frontNode = this.front!;
        let backNode = this.back!;

        if (node.prev === null) {
            // remove front
            this.front = node.next;
            if (this.front !== null) {
                this.front.prev = null;
            }
        } 
        else if (node.next === null) {
            // remove back
            this.back = node.prev;
            if (node.prev !== null) {
                node.prev.next = null;
            }
        }
        else {
            // remove middle
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }

        --this.size;
    }

    private insertNode(pos: LLNodeRef<T>, node: LLNode<T>): void {
        if (this.size === 0) {
            // base case
            this.front = node;
            this.back = this.front;
        }
        else if (pos === null) {
            // insert back
            let backNode = this.back!;
            node.prev = backNode;
            backNode.next = node;
            this.back = node;
        }
        else if (pos.prev === null) {
            // insert front
            let frontNode = this.front!;
            node.next = frontNode;
            frontNode.prev = node;
            this.front = node;
        }
        else {
            // insert middle
            node.next = pos;
            node.prev = pos.prev;
            pos.prev.next = node;
            pos.prev = node;
        }

        ++this.size;
    }

    append(value: T) {
        this.insertNode(this.front, new LLNode<T>(value));
    }

    prepend(value: T) {
        this.insertNode(null, new LLNode<T>(value));
    }

    forEach(cb: (e: T) => void): void {
        let it = this.front;

        while (it !== null) {
            cb(it.value);
            it = it.next;
        }
    }
    
    find(cb: (e: T) => boolean): (T | undefined) {
        let it = this.front;

        while (it != null) {
            if (cb(it.value) === true) {
                return it.value;
            }
            it = it.next;
        }

        return undefined;
    }
}