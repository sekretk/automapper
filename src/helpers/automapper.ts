//@ts-nocheck

import { Mapper } from "../interfaces";

class MapperInstance {
 
    previousTransformator;
    key: string;
    transform;
 
    constructor(previousTransformator){
        this.previousTransformator = previousTransformator;
    }
 
    map(key: string, transform) {
        this.key = key as string;
        this.transform = transform;
        return new MapperInstance(this.result);
    }
 
    result = (source) =>
        Boolean(this.transform)
            ? { ...this.transform(source[this.key]), ...this.previousTransformator?.(source) }
            : this.previousTransformator?.(source);
}
 
export const mapperFabric = <Tin, Tout>(): Mapper<Tin, Tout> => new MapperInstance(undefined) as unknown as Mapper<Tin, Tout>;
