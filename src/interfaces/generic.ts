/**
 * If TLeft extends TRight type returns TIfExtends
 * overwise return TIfNot
 */
 export type IfExtends<TLeft, TRight, TIfExtends, TIfNot = false> =
    [TLeft] extends [TRight]
     ? TIfExtends
     : TIfNot;

/**
 * If TRight extends TLeft type returns TIfIncludes
 * overwise return TIfNot
 */
export type IfIncludes<TLeft, TRight, TIfIncludes, TIfNot = never> = IfExtends<TRight, TLeft, TIfIncludes, TIfNot>;
    
/**
* If TLeft exact TRight type returns TIfExact
* overwise return TIfNot
*/
export type IfExact<TLeft, TRight, TIfExact, TIfNot = false> =
IfExtends<TLeft, TRight, IfExtends<TRight, TLeft, TIfExact, TIfNot>, TIfNot>

export type IfShallowExact<T01, T02, TY, TN> = IfExact<keyof T01, keyof T02, TY, TN>;

export type IfSubsetKeys<T01, T02, TY, TN> = Exclude<keyof T02, keyof T01> extends never ? TY : TN

export type TransformAction<Tin,Tout> = (item: Tin) => Tout;

export type IsTrue<T extends true> = T;

export type IsFalse<T extends false> = T;