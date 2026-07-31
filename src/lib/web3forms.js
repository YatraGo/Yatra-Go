const DEFAULT_FORMS_ENDPOINT = '/api/forms/submit';

export const submitWeb3Form = async ({ subject, fields, replyTo }) => {
    const endpoint = import.meta.env.VITE_FORMS_ENDPOINT || DEFAULT_FORMS_ENDPOINT;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            subject,
            fields,
            replyTo,
        }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
        throw new Error(result.message || result.error || 'Unable to submit form right now.');
    }

    return result;
};

