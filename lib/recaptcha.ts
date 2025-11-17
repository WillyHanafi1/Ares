/**
 * Verifies Google reCAPTCHA v3 token
 * @param token - The reCAPTCHA token from client
 * @returns Promise<boolean> - True if verification passes
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  if (!token || typeof token !== 'string') {
    console.error('Invalid reCAPTCHA token');
    return false;
  }

  try {
    console.log('🔐 Verifying reCAPTCHA token...');
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    if (!response.ok) {
      console.error('reCAPTCHA API error:', response.statusText);
      return false;
    }

    const data = await response.json();
    console.log('📊 reCAPTCHA response:', JSON.stringify(data, null, 2));

    // Check if verification succeeded and score is above threshold
    // Score ranges from 0.0 (bot) to 1.0 (human)
    // 0.5 is recommended threshold for form submissions
    if (data.success && data.score >= 0.5) {
      console.log('✅ reCAPTCHA verification passed! Score:', data.score);
      return true;
    }

    console.warn('❌ reCAPTCHA verification failed:', {
      success: data.success,
      score: data.score,
      action: data.action,
      errors: data['error-codes'],
    });

    return false;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}
