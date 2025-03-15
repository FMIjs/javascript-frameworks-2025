import * as jwt from "jsonwebtoken";

const privateKey = "123";

export function createToken<T extends object>(data: T) {
  return new Promise<string>((res, rej) => {
    jwt.sign(data, privateKey, function (err, token) {
      if (err || !token) return rej(err);
      res(token);
    });
  });
}

export function verifyToken<T>(token: string) {
  return new Promise((res, rej) => {
    jwt.verify(token, privateKey, function (err, decoded) {
      if (err) return rej(err);
      res(decoded as T);
    });
  });
}
