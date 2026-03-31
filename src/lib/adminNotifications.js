import { submitWeb3Form } from './web3forms';

const formatRegisteredAt = () => new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export const notifyAdminOfRegistration = async ({ userId, name, email, phone = '', role = 'user' }) => {
    const subjectLine = name?.trim() || email || 'Traveler';

    await submitWeb3Form({
        subject: subjectLine,
        replyTo: email,
        fields: {
            from_name: 'Yatra Go User Registration',
            form_type: 'User Registration Alert',
            admin_email: 'sales.yatrago@gmail.com',
            user_id: userId,
            name: name || 'Traveler',
            email,
            phone: phone || 'Not provided',
            role,
            registered_at: formatRegisteredAt(),
            security_note: 'Password is intentionally excluded for customer security.',
        },
    });
};
