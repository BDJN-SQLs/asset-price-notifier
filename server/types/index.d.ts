/*
TypeScript uses the .d.ts declaration files to load type information about a library written in JavaScript. 
Here, the index.d.ts global module will be used by TypeScript to extend the Express Request type globally through 
declaration merging. According to the Express source code, this is the officially endorsed way to extend the Request type.
*/

export type User = {
  email: string;
  id: number;
  token: string | null;
  exp: number;
};

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
