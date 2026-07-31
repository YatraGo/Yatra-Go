export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return res.status(500).json({
      success: false,
      message: 'Web3Forms access key is not configured on the server.',
    });
  }

  try {
    const { subject, fields = {}, replyTo } = req.body || {};

    if (!subject || typeof fields !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid form payload.' });
    }

    const payload = {
      access_key: accessKey,
      subject,
      from_name: fields.from_name || 'Yatra Go Web Query',
      replyto: replyTo || fields.email || fields.customerEmail || '',
      ...fields,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      return res.status(response.ok ? 400 : response.status).json({
        success: false,
        message: result.message || 'Unable to submit form right now.',
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Vercel Web3Forms proxy error:', error);
    return res.status(500).json({ success: false, message: 'Form submission failed.' });
  }
}
