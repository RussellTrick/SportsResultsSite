import countries from "i18n-iso-countries";

const flagService = {
  fetchFlag: (countryCode: string): string | null => {
    // Convert the 3-letter country code to 2-letter in order to align properly with flagcdn
    const twoLetterCode = countries.alpha3ToAlpha2(countryCode);
    if (!twoLetterCode) {
      return null;
    }
    return `https://flagcdn.com/${twoLetterCode.toLowerCase()}.svg`;
  },
};

export default flagService;
