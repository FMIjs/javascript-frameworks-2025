export type FetchParams = Parameters<typeof fetch>;

export type Method = NonNullable<FetchParams["1"]>["method"];
export type Headers = NonNullable<FetchParams["1"]>["headers"];

export type AppStore = {
  user: User | null;
};

export type User = {
  age: number;
  firstName: string;
  id: string;
  lastName: string;
};
