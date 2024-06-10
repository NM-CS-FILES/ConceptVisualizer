export type CacheStats = {

};

export type CacheEntry = {
    valid: boolean;
    tag: number;
    data: number;
    stats: CacheStats;
};

export class Cache {
    private data: CacheEntry[];

    constructor(size: number) {
        let nearestPowerOf2 = Math.pow(2, Math.ceil(Math.log(size) / Math.log(2)));
        this.data = new Array(nearestPowerOf2);
    }

    map(addr: number): number {
        throw new Error("Not Implemented");
    }

    size(): number {
        return this.data.length;
    }

    at(offset: number): number {
        throw new Error("Method not implemented.");
    }
}

//
//

export class DirectMappedCache extends Cache {
    constructor(size: number) {
        super(size);
    }

    override map(addr: number): number {
        return addr % this.size();
    }
}

//
//

export class SetAssociativeCache extends Cache {
    private mSetCount: number;

    constructor(size: number, setCount: number) {
        super(size);
        this.mSetCount = setCount;
    }
}