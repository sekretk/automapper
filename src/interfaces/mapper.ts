/* eslint-disable @typescript-eslint/ban-types */
import { DeepRequired, FlatRequired, IfExact, IfExtends, IfIncludes, IfShallowExact, IsTrue, TransformAction } from '.';

type IN_COVERED_OUT_NOT = 'ALL PROPS IN SOURCE ARE USED BUT NOT IN DESTINATION';
type SOURCE_NOT_COVERED = 'NOT ALL PROPERTIES FROM SOURCE USED';
 
export type Mapper<Tin, Tout, TinTemp extends Partial<Tin> = {}, ToutTemp = {}> =
    IfShallowExact<
        Tin,
        TinTemp,
        IfIncludes<
            FlatRequired<Tout>,
            ToutTemp,
            {
                result: TransformAction<TinTemp, ToutTemp>,
            },
            {
                msg: IN_COVERED_OUT_NOT
            }
        >,
        {
            msg: SOURCE_NOT_COVERED,
            map<K extends Exclude<keyof Tin, keyof TinTemp>, R extends Partial<Omit<Tout, keyof ToutTemp>>>(
                key: K,
                value: TransformAction<Tin[K], R>):
                Mapper<Tin, Tout, TinTemp & Record<K, Tin[K]>, ToutTemp & R>
        }
    >;

type TIssue01 = { a: number, b: boolean };

type TIssue02 = {a: number, b: string};

type TIssueInWithOptional = { a: number, b?: boolean };

type TIssueOutWithLiteral = {a: number, b: 'asd'};;

type ttt = Mapper<TIssue01, TIssue02, Record<keyof TIssue01, any>, TIssueOutWithLiteral>;

type _TEST_SUITE = [
    IsTrue<IfExtends<Mapper<TIssue01, TIssue02>, { msg: SOURCE_NOT_COVERED }, true>>,
    IsTrue<IfExtends<Mapper<TIssue01, TIssue02, { a: any }, { a: number }>, { msg: SOURCE_NOT_COVERED }, true>>,
    IsTrue<IfExtends<Mapper<TIssue01, TIssue02, Record<keyof TIssue01, any>, { a: number }>, { msg: IN_COVERED_OUT_NOT }, true>>,
    IsTrue<IfExact<Mapper<TIssue01, TIssue02, Record<keyof TIssue01, any>, { a: number, b: string }>, { result: TransformAction<TIssue01, TIssue02> }, true>>,
    IsTrue<IfExtends<Mapper<TIssueInWithOptional, TIssue02, {a: number}>, { msg: SOURCE_NOT_COVERED }, true>>,
    IsTrue<IfExtends<Mapper<TIssue01, TIssue02, Record<keyof TIssue01, any>, TIssueOutWithLiteral>, { result: TransformAction<TIssue01, TIssue02> }, true>>,
]