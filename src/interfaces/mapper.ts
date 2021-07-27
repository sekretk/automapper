/* eslint-disable @typescript-eslint/ban-types */
import { IfExact, IfExtends, TransformAction } from '.';
 
export type Mapper<Tin, Tout, TinTemp extends Partial<Tin> = {}, ToutTemp = {}> =
IfExact<
Tin,
TinTemp,
{
    msg: 'ALL PROPS IN SOURCE ARE USED',
    result: TransformAction<TinTemp, ToutTemp>,
},
{
    msg: 'NOT ALL PROPERTIES FROM SOURCE USED',
    map<K extends Exclude<keyof Tin, keyof TinTemp>, R extends Partial<Omit<Tout, keyof ToutTemp>>>(
        key: K,
        value: TransformAction<Tin[K], R>):
    IfExtends<
    ToutTemp,
    R,
    Mapper<Tin, Tout, TinTemp & Record<K, Tin[K]>, ToutTemp & R>,
    never
    >
}>;
