import { WithId } from "../utils";

export type ModelData<T> = {
  entries: WithId<T>[];
};
