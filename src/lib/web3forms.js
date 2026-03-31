const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const submitWeb3Form = async ({ subject, fields, replyTo }) => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
        throw new Error('Web3Forms access key is missing.');
    }

    const payload = {
        access_key: accessKey,
        subject,
        from_name: fields.from_name || 'Yatra Go Web Query',
        replyto: replyTo || fields.email || fields.customerEmail || '',
        ...fields,
    };

    const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit form right now.');
    }

    return result;
};

