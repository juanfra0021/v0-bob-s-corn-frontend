# Bob's Corn API Server

A rate-limited Express.js API server for Bob's Corn Farm that implements fair trade purchasing policies.

## Features

- **Rate Limiting**: Maximum 1 corn purchase per minute per client
- **Fair Trade Policy**: Ensures sustainable farming practices
- **RESTful API**: Clean endpoints for corn purchasing
- **Error Handling**: Comprehensive error responses
- **CORS Support**: Cross-origin requests enabled

## API Endpoints

### Health Check
\`\`\`
GET /api/health
\`\`\`
Returns server status and timestamp.

### Purchase Corn
\`\`\`
POST /api/purchase-corn
\`\`\`
Purchase corn with rate limiting (1 per minute).

**Success Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Corn purchased successfully!",
  "amount": 200,
  "purchaseId": "purchase_1234567890_abc123",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "emoji": "🌽🌽🌽🌽"
}
\`\`\`

**Rate Limited Response (429):**
\`\`\`json
{
  "error": "Too Many Requests",
  "message": "You can only purchase corn once per minute. Please wait before trying again.",
  "retryAfter": 45,
  "nextPurchaseAllowed": "2024-01-01T12:01:00.000Z"
}
\`\`\`

### Rate Limit Status
\`\`\`
GET /api/rate-limit-status
\`\`\`
Check current rate limit status for the client.

### Purchase History
\`\`\`
GET /api/purchase-history
\`\`\`
Get purchase history (mock endpoint for demo).

## Installation

1. Navigate to the server directory:
\`\`\`bash
cd server
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Start the production server:
\`\`\`bash
npm start
\`\`\`

The server will run on `http://localhost:3001` by default.

## Rate Limiting Logic

- Each client IP is tracked individually
- 1 purchase allowed per 60-second window
- Rate limit resets after the time window expires
- Precise timing with remaining seconds provided in responses

## Production Considerations

- Replace in-memory storage with Redis or database
- Add authentication and user management
- Implement proper logging and monitoring
- Add input validation and sanitization
- Configure environment variables
- Add SSL/TLS encryption
- Implement proper database schema for purchase history
