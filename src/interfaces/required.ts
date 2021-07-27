export type FlatRequired<T> = {
    [P in keyof T]-?: T[P];
};
 
export type DeepRequired<T> =
    T extends Function
        ? T
        : T extends object
            ? { [P in keyof T]-?: DeepRequired<T[P]>; }
            : T;
