# API Reference

## Contact Form API

### Endpoint
```
POST /api/contact
```

### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

### Request Body
```typescript
{
  name: string;          // 2-100 characters
  email: string;         // Valid email format
  company: string;       // 2-200 characters
  message: string;       // 10-2000 characters
  recaptchaToken: string; // reCAPTCHA v3 token
}
```

### Success Response (201)
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "id": 123
}
```

### Error Responses

#### 400 - Validation Error
```json
{
  "success": false,
  "errors": {
    "name": "Name must be at least 2 characters",
    "email": "Invalid email format"
  }
}
```

#### 403 - reCAPTCHA Failed
```json
{
  "success": false,
  "error": "reCAPTCHA verification failed. Please try again."
}
```

#### 429 - Rate Limit Exceeded
```json
{
  "success": false,
  "error": "Too many submissions. Please try again later."
}
```

#### 500 - Server Error
```json
{
  "success": false,
  "error": "An unexpected error occurred. Please try again later."
}
```

### Health Check
```
GET /api/contact
```

Response:
```json
{
  "status": "ok",
  "message": "Contact API is running"
}
```

## Frontend Integration

### Basic Usage

```typescript
const handleSubmit = async (formData) => {
  // 1. Get reCAPTCHA token
  const token = await window.grecaptcha.execute(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    { action: 'contact' }
  );

  // 2. Submit form
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      recaptchaToken: token,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to send message');
  }

  return data;
};
```

### Error Handling

```typescript
try {
  const result = await handleSubmit(formData);
  // Show success message
} catch (error) {
  if (error.message.includes('reCAPTCHA')) {
    // Handle reCAPTCHA error
  } else if (error.message.includes('Too many')) {
    // Handle rate limit
  } else {
    // Handle general error
  }
}
```

## Database Schema

### Contacts Table

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_contacts_ip_address ON contacts(ip_address);
```

## Email Templates

### Admin Notification
- **From**: SeriaFlow <onboarding@resend.dev>
- **To**: NOTIFICATION_EMAIL
- **Subject**: New Contact Form Submission from {name}
- **Template**: Styled HTML with lead details

### Customer Confirmation
- **From**: SeriaFlow <onboarding@resend.dev>
- **To**: {submitter_email}
- **Subject**: Thank you for contacting SeriaFlow!
- **Template**: Branded thank you message

## Rate Limiting

- **Default**: 5 submissions per hour per IP address
- **Window**: 3600000ms (1 hour)
- **Tracking**: Based on IP address from headers
- **Configurable**: Via environment variables

## Security Measures

### Input Validation
- Length checks on all fields
- Email format validation (RFC-compliant)
- Type checking
- Trim whitespace

### Sanitization
- DOMPurify removes all HTML tags
- SQL injection prevention via parameterized queries
- XSS pattern detection

### Bot Protection
- reCAPTCHA v3 score-based verification
- Minimum score: 0.5 (0.0=bot, 1.0=human)
- Invisible to users
- Action tracking

## Environment Variables

### Required
```env
DATABASE_URL              # PostgreSQL connection string
NEXT_PUBLIC_RECAPTCHA_SITE_KEY  # reCAPTCHA site key (public)
RECAPTCHA_SECRET_KEY      # reCAPTCHA secret key (private)
RESEND_API_KEY            # Resend email API key
NOTIFICATION_EMAIL        # Email to receive notifications
```

### Optional
```env
RATE_LIMIT_MAX=5          # Max submissions per window
RATE_LIMIT_WINDOW=3600000 # Time window in milliseconds
```

## Testing

### Test Health Endpoint
```bash
curl http://localhost:3000/api/contact
```

### Test Form Submission
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    "message": "This is a test message",
    "recaptchaToken": "test_token_here"
  }'
```

### Test Rate Limiting
Submit 6 forms rapidly - the 6th should return 429 error.

### Test Database
```sql
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
```

## Monitoring

### Database Queries
- View recent contacts
- Check rate limit status
- Monitor submission patterns

### Email Logs
- Resend dashboard shows all sent emails
- Delivery status and open rates
- Error logs for failed sends

### Error Tracking
- Check Vercel logs for API errors
- Monitor reCAPTCHA scores
- Track validation failures

## Performance

### Expected Response Times
- Health check: <50ms
- Form submission: 200-500ms
- Database insert: 50-100ms
- Email send: 100-300ms (async)

### Optimizations
- Connection pooling for database
- Async email sending (doesn't block response)
- Indexed database queries
- Efficient rate limit checking

## Troubleshooting

See [BACKEND_SETUP.md](BACKEND_SETUP.md) for detailed troubleshooting guide.

Quick fixes:
- **reCAPTCHA errors**: Check site key configuration
- **Database errors**: Verify connection string
- **Email errors**: Check Resend API key
- **Rate limit**: Wait 1 hour or reset database
