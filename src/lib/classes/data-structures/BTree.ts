type BNodeRef<T> = (BNode<T> | null);

export type LessThan<T> = (a: T, B: T) => boolean;

export class BNode<T> {
    value: T;
    left: BNodeRef<T>;
    right: BNodeRef<T>;
    parent: BNodeRef<T>;

    constructor(
        value: T, 
        left: BNodeRef<T> = null,
        right: BNodeRef<T> = null,
        parent: BNodeRef<T> = null
    ) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

export class BTree<T> {
    private lessThan: LessThan<T>;
    private root: BNodeRef<T>;
    private tSize: number;

    private static lastDescendant<T>(node: BNodeRef<T>, left: boolean): BNodeRef<T> {
        if (node !== null) {
            let next = left ? node.left : node.right;

            while (next !== null) {
                node = next;
                next = left ? node.left : node.right;
            }
        }

        return node;
    }

    private static firstAncestor<T>(node: BNodeRef<T>, left: boolean): BNodeRef<T> {
        if (node !== null) {
            let p = node.parent;

            while (p !== null && (left ? p.right : p.left) === node) {  
                node = p;
                p = node.parent;
            }

            node = p;
        }

        return node;
    }

    private static inOrderSuccessor<T>(node: BNodeRef<T>): BNodeRef<T> {
        if (node === null) {
            return null;
        }

        return (node.right === null) ? 
            this.firstAncestor(node, true) : this.lastDescendant(node.right, true);
    }

    private static preOrderSuccessor<T>(node: BNodeRef<T>): BNodeRef<T> {
        if (node === null) {
            return null;
        }
        else if (node.left !== null) {
            return node.left;
        }
        else if (node.right !== null) {
            return node.right;
        }

        while (node !== null && node.right !== null) {
            node = this.firstAncestor(node, true);
        }

        return (node === null) ? node : node.right;
    }

    private static postOrderSuccessor<T>(node: BNodeRef<T>): BNodeRef<T> {
        if (node === null) {
            return null;
        }

        let p = node.parent;

        if (p === null) {
            return null;
        }
        else if (p.right === node) {
            return p;
        }

        let iter = p.right;
        while (iter !== null && (iter.left !== null || iter.right !== null)) {
            iter = (iter.left || iter.right);
        }

        return iter;
    }

    constructor(
        lessThan: LessThan<T> = (a: T, b: T) => { return a < b; }
    ) {
        this.root = null;
        this.tSize = 0;
        this.lessThan = lessThan;
    }

    private findNode(value: T): BNodeRef<T> {
        if (this.root === null) {
            return null;
        }

        let iter: BNodeRef<T> = this.root;
        let prev: BNodeRef<T> = null;

        while (iter !== null) {
            prev = iter;

            if (iter.value === value) {
                break;
            }

            iter = this.lessThan(value, iter.value) ? 
                iter.left : iter.right;
        }

        return prev;
    }

    private insertNode(parent: BNodeRef<T>, node: BNode<T>) : void {
        if (parent === null) {
            this.root = node;
        } else {
            if (this.lessThan(node.value, parent.value)) {
                parent.left = node;
            }
            else {
                parent.right = node;
            }
            node.parent = parent;
        }

        ++this.tSize;
    }

    private forEach(
        iter: BNodeRef<T>, 
        successor: (n: BNodeRef<T>) => BNodeRef<T>, 
        cb: (v: T) => void
    ): void {
        while (iter !== null) {
            cb(iter.value);
            iter = successor(iter);
        }
    }

    forEachInOrder(cb: (v: T) => void): void {
        this.forEach(
            BTree.lastDescendant(this.root, true),
            BTree.inOrderSuccessor,
            cb
        );
    }

    forEachPreOrder(cb: (v: T) => void): void {
        this.forEach(
            BTree.lastDescendant(this.root, true),
            BTree.preOrderSuccessor,
            cb
        );
    }

    forEachPostOrder(cb: (v: T) => void): void {
        this.forEach(
            BTree.lastDescendant(this.root, true),
            BTree.postOrderSuccessor,
            cb
        );
    }

    insert(value: T) {
        let parent = this.findNode(value);
        if (parent === null || parent.value !== value) {
            // no duplicates
            this.insertNode(parent, new BNode<T>(value));
        }
    }

    size(): number {
        return this.tSize;
    }
}