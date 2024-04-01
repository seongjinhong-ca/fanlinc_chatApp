import LocalizedStrings from 'localized-strings';

export const i18n = new LocalizedStrings(
    {
        en: {
            missingFieldError: "You are missing '{0}' field in your request.",
            roleNotFoundError: "Role cannot be found."
        },
    },
    {}
);
