export const submitWeb3Form = async ({ subject, fields, replyTo }) => {
    const response = await fetch('http://localhost:3001/api/forms/submit', {
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

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to submit form right now.');
    }

    return result;
};

