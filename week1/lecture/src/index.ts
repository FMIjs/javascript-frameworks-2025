let str: string = "1";
let num: number = 1;
let bool: boolean = !!1;
let arr: number[] = [1, 2];

// type Test<T> = T extends number ? number : never
// type a = Test<1>

type HEAD<T extends Array<any>> = T extends [infer T, ...any] ? [T] : never;
type TAIL<T extends Array<any>> = T extends [any, ...infer U] ? U : never;
type a = TAIL<[1, 2, 3, 3]>;

//Reverse<[1,2,3]> -> [3,2,1]
type Reverse<T extends Array<any>> = T extends [infer U]
  ? [U]
  : T extends [infer U, ...infer REST]
  ? [...Reverse<REST>, U]
  : never;

type r = Reverse<[1, 2, 3]>;

function test(): never {
  throw new Error("ewawad");
}

function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  if (a && typeof a === "object" && "b" in a && typeof a["b"] === "function") {
    a.b();
  }
}

function addOne(num: string): string;
function addOne(num: number): number;
function addOne(num: number, test: string): number;
function addOne(num: number, test: string, best: boolean): number;
function addOne(num: string | number, test?: string, best?: boolean): any {
  if (typeof num === "number") {
    return num.toFixed(2);
  }
}

function doSomething(type: Type, count: 1) {}

type Type = "car" | "bus";
type NumberArray = number[];
type StringTuple = [string, string];

type MyObj = {
  prop1: number;
  prop2: string;
  prop3?: boolean;
};

interface IMyObj<T1 extends string[]> {
  prop1: number;
  prop2: string;
  prop3?: boolean;
  myMethod: (num: T1) => boolean;
}

class myClass implements IMyObj<["s"]> {
  prop1 = 1;
  prop2 = "1";
  prop3 = true;
  myMethod(num: number) {
    return true;
  }
}

const a: StringTuple = ["1", "1", "2"];

doSomething("car", 2);

// function addOne2(num: number, test?: string, best?: boolean) {
//   if (test)
// }

const cb = (a: number) => console.log(a);
addOne();
