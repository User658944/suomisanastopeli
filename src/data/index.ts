// src/data/index.ts
import { animals } from "./animals";
import { food } from "./food";
import { objects } from "./objects";
import { professions } from "./professions";
import { vehicles } from "./vehicles";
import { directions } from "./directions";
import { clothes } from "./clothes";
import { time } from "./time";
import { colors } from "./colors";
import { school } from "./school";
import { home } from "./home";
import { traffic } from "./traffic";
import { some } from "./some";

// lauseet
import { animalsdo } from "./animalsdo";
import { intraffic } from "./intraffic";
import { atschool } from "./atschool";
import { atwork } from "./atwork";

export const allWords = [
  ...animals,
  ...food,
  ...objects,
  ...professions,
  ...vehicles,
  ...directions,
  ...clothes,
  ...time,
  ...colors,
  ...school,
  ...home,
  ...traffic,
  ...some,

  // lauseet
  ...animalsdo,
  ...intraffic,
  ...atschool,
  ...atwork,
];
