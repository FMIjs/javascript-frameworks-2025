declare global {
  namespace globalThis {
    var __basedir: string;
  }

  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export {};
