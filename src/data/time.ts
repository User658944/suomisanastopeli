// src/data/time.ts
import type { Word } from "./types";

export const time: Word[] = [
  // BEGINNER (päivät + yleisimmät juhlat)
  { fi: "maanantai", en: "Monday", category: "time", difficulty: "beginner" },
  { fi: "tiistai", en: "Tuesday", category: "time", difficulty: "beginner" },
  {
    fi: "keskiviikko",
    en: "Wednesday",
    category: "time",
    difficulty: "beginner",
  },
  { fi: "torstai", en: "Thursday", category: "time", difficulty: "beginner" },
  { fi: "perjantai", en: "Friday", category: "time", difficulty: "beginner" },
  { fi: "lauantai", en: "Saturday", category: "time", difficulty: "beginner" },
  { fi: "sunnuntai", en: "Sunday", category: "time", difficulty: "beginner" },

  { fi: "joulu", en: "Christmas", category: "time", difficulty: "beginner" },
  { fi: "uusivuosi", en: "New Year", category: "time", difficulty: "beginner" },
  { fi: "juhannus", en: "Midsummer", category: "time", difficulty: "beginner" },
  { fi: "pääsiäinen", en: "Easter", category: "time", difficulty: "beginner" },
  { fi: "vappu", en: "May Day", category: "time", difficulty: "beginner" },

  // MEDIUM (kuukaudet)
  { fi: "tammikuu", en: "January", category: "time", difficulty: "medium" },
  { fi: "helmikuu", en: "February", category: "time", difficulty: "medium" },
  { fi: "maaliskuu", en: "March", category: "time", difficulty: "medium" },
  { fi: "huhtikuu", en: "April", category: "time", difficulty: "medium" },
  { fi: "toukokuu", en: "May", category: "time", difficulty: "medium" },
  { fi: "kesäkuu", en: "June", category: "time", difficulty: "medium" },
  { fi: "heinäkuu", en: "July", category: "time", difficulty: "medium" },
  { fi: "elokuu", en: "August", category: "time", difficulty: "medium" },
  { fi: "syyskuu", en: "September", category: "time", difficulty: "medium" },
  { fi: "lokakuu", en: "October", category: "time", difficulty: "medium" },
  { fi: "marraskuu", en: "November", category: "time", difficulty: "medium" },
  { fi: "joulukuu", en: "December", category: "time", difficulty: "medium" },

  // HARD (tarkemmat juhlat / pyhäpäivät)
  { fi: "loppiainen", en: "Epiphany", category: "time", difficulty: "hard" },
  {
    fi: "ystävänpäivä",
    en: "Valentine’s Day",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "laskiainen",
    en: "Shrove Tuesday",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "pitkäperjantai",
    en: "Good Friday",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "pääsiäissunnuntai",
    en: "Easter Sunday",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "helatorstai",
    en: "Ascension Day",
    category: "time",
    difficulty: "hard",
  },
  { fi: "helluntai", en: "Pentecost", category: "time", difficulty: "hard" },
  {
    fi: "pyhäinpäivä",
    en: "All Saints’ Day",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "itsenäisyyspäivä",
    en: "Independence Day",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "tapaninpäivä",
    en: "St. Stephen’s Day",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "uudenvuodenpäivä",
    en: "New Year’s Day",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "jouluaatto",
    en: "Christmas Eve",
    category: "time",
    difficulty: "hard",
  },
  {
    fi: "joulupäivä",
    en: "Christmas Day",
    category: "time",
    difficulty: "hard",
  },
];
