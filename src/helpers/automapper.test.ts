import { mapperFabric } from ".";
import { FlatRequired, IfExact, IfExtends, IfIncludes, Mapper, TransformAction } from "../interfaces";
 
describe('function \'mapperFabric\' to test', () => {
    it('should map objects', () => {

        type TIssue1 = {
            a: number,
            b: boolean,
            //e?: string,
        };
         
        type TIssue2 = {
            c: number,
            b: string,
            d: boolean,
            e: boolean,
        };

        const transformattor = mapperFabric<TIssue1, TIssue2>()
            .map('a', (a) => ({c: a, b: 'asdas'}))
            .map('b', (b) => ({d: b, e: true}))
            .result;

        const someTansformerConsumer = (inObj: TIssue1): TIssue2 => transformattor(inObj);
 
        const issueMapper =
            mapperFabric<TIssue1, TIssue2>()
                .map('a', (item) => ({ c: item }))
            //.map('a', (obj) => ({c: obj})) //ERROR: exclucive source keys
                .map('b', (item) => ({ b: 'aaa', d: item }))
            //.map('b', () => ({b: 'aaa', d: true, c: 1})) //ERROR: exclusive result object
                .result;
 
        expect(issueMapper({ a: 123, b: true })).toEqual({ c: 123, d: true, b: 'aaa' });
    });

    it('Working with optional props', () => {

        type TIssue1 = {
            a: number,
            b?: boolean
        };
         
        type TIssue2 = {
            c: number,
            b: string,
            d?: boolean
        };
 
        const issueMapper: TransformAction<FlatRequired<TIssue1>, FlatRequired<TIssue2>> =
            mapperFabric<FlatRequired<TIssue1>, FlatRequired<TIssue2>>()
                .map('a', (item) => ({ c: item }))
            //.map('a', (obj) => ({c: obj})) //ERROR: exclucive source keys
                .map('b', (item) => ({ b: 'aaa', d: item }))
            //.map('b', () => ({b: 'aaa', d: true, c: 1})) //ERROR: exclusive result object
                .result;
 
        expect(issueMapper({ a: 123, b: true })).toEqual({ c: 123, d: true, b: 'aaa' });
    });
});
