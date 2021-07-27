/**
 * If TLeft extends TRight type returns TIfExtends
 * overwise return TIfNot
 */
 export type IfExtends<TLeft, TRight, TIfExtends, TIfNot = never> =
 keyof TLeft extends Exclude<keyof TLeft, keyof TRight>
     ? TIfExtends
     : TIfNot;

/**
* If TLeft exact TRight type returns TIfExact
* overwise return TIfNot
*/
export type IfExact<TLeft, TRight, TIfExact, TIfNot = never> =
TLeft extends TRight
 ? TRight extends TLeft
     ? TIfExact
     : TIfNot
 : TIfNot;


export type TransformAction<Tin,Tout> = (item: Tin) => Tout;
