/*
 *  Copyright 2023, 2024 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import * as fr from '../../locales/fr/rrule.json';
import * as pt from '../../locales/pt/rrule.json';
import * as es from '../../locales/es/rrule.json';

const getLanguage = (language) => {
  const { getText, dayNames, monthNames } = language;

  return {
    getText: (id) => getText[id] || id,
    language: {
      dayNames: dayNames,
      monthNames: monthNames,
    },
  };
};

const languageFiles = { fr, pt, es };

export const getRruleLanguage = (language) => {
  if (!Object.keys(languageFiles).includes(language)) {
    return { getText: (id) => id, language: null };
  }
  return getLanguage(languageFiles[language]);
};
