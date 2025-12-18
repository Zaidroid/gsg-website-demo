import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically comes from `params` or headers
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !['en', 'ar'].includes(locale)) {
        locale = 'en';
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
