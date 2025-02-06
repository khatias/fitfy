export const getLocalizedText = (locale: string, enText: string, kaText: string = ""): string => {
    return locale === "en" ? enText : kaText;
  };
  