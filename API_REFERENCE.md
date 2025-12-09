# API Reference

## POST /api/contact

### Request
```json
{
  "name": "string (2-100 chars)",
  "email": "string (valid email)",
  "company": "string (2-200 chars)",
  "message": "string (10-2000 chars)",
  "recaptchaToken": "string"
}
```

### Responses

| Code | Description |
|------|-------------|
| 201 | Success |
| 400 | Validation error |
| 403 | reCAPTCHA failed |
| 429 | Rate limit (5/hour) |
| 500 | Server error |

### Success (201)
```json
{
  "success": true,
  "message": "Thank you!",
  "id": 123
}
```

## GET /api/contact
Health check. Returns `{ "status": "ok" }`

## Database Schema
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  company VARCHAR(200),
  message TEXT,
  ip_address VARCHAR(45),
  is_read BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## n8n Webhook Payload
When `N8N_WEBHOOK_URL` is set, validated data is forwarded:
```json
{
  "name": "...",
  "email": "...",
  "company": "...",
  "message": "...",
  "id": 123,
  "ip": "...",
  "submittedAt": "ISO timestamp"
}
```
