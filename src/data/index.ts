// src/data/index.ts
export { animals } from "./animals";
export { food } from "./food";
export { objects } from "./objects";
export { professions } from "./professions";

import { animals } from "./animals";
import { food } from "./food";
import { objects } from "./objects";
import { professions } from "./professions";
import { vehicles } from "./vehicles";
import { directions } from "./directions";

export const allWords = [
  ...animals,
  ...food,
  ...objects,
  ...professions,
  ...vehicles,
  ...directions,
];
