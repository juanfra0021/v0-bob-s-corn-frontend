# Bob's Corn Farm - Rate Limited Corn Purchase App

A delightful full-stack application built with Vite, React, TypeScript, and Material UI that demonstrates rate limiting concepts through Bob's sustainable corn farm business.

## 🌽 Features

### Frontend (Vite + React + Material UI)
- **Beautiful UI**: Corn-themed design with golden yellow color palette
- **Smooth Animations**: Framer Motion animations for delightful user experience
- **Material UI Components**: Professional, accessible interface components
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Updates**: Live inventory tracking and purchase history
- **Achievement System**: Unlock achievements as you collect more corn
- **Statistics Dashboard**: Track your farming efficiency and impact

### Backend (Express.js + Rate Limiting)
- **Rate Limiting**: Maximum 1 corn purchase per minute per client
- **Fair Trade Policy**: Ensures sustainable farming practices
- **RESTful API**: Clean, well-documented endpoints
- **Error Handling**: Comprehensive error responses with helpful messages
- **CORS Support**: Cross-origin requests enabled for development

### Key Components
1. **Corn Purchase Interface**: Step-by-step purchase flow with animations
2. **Inventory Tracking**: Real-time corn count with progress indicators
3. **Rate Limit Status**: Visual countdown and efficiency metrics
4. **Purchase History**: Recent transaction log with success/failure states
5. **Achievement System**: Gamified experience with unlockable rewards

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd bobs-corn-app
   \`\`\`

2. **Install frontend dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install backend dependencies**
   \`\`\`bash
   cd server
   npm install
   \`\`\`

### Running the Application

1. **Start the backend server**
   \`\`\`bash
   cd server
   npm run dev
   \`\`\`
   The API server will run on `http://localhost:3001`

2. **Start the frontend development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to start buying corn!

## 🎯 How It Works

### Rate Limiting Logic
- Each client IP can make 1 corn purchase per minute
- Successful purchases return 200🌽 of fresh corn
- Rate-limited requests return HTTP 429 with retry information
- Visual countdown shows time until next purchase is allowed

### API Endpoints

#### `GET /api/health`
Health check endpoint to verify server status.

#### `POST /api/purchase-corn`
Purchase corn with rate limiting protection.

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

#### `GET /api/rate-limit-status`
Check current rate limit status for the client.

## 🎨 Design Features

### Color Palette
- **Primary**: Golden yellow (#F59E0B) - Represents corn and harvest
- **Secondary**: Emerald green (#10B981) - Agricultural and sustainable theme
- **Background**: Cream (#FFFBEB) - Warm, welcoming farm atmosphere
- **Accents**: Various complementary colors for status indicators

### Animations
- **Corn particles**: Floating corn emojis on successful purchases
- **Rotating elements**: Subtle rotations for interactive elements
- **Scale animations**: Hover and click feedback
- **Progress indicators**: Smooth transitions for loading states
- **Achievement unlocks**: Celebration animations for milestones

### Typography
- **Font Family**: Inter - Clean, modern, highly readable
- **Hierarchy**: Clear distinction between headings and body text
- **Weights**: Strategic use of font weights for emphasis

## 🏆 Achievement System

Unlock achievements as you support Bob's sustainable farming:

- **🌱 First Harvest** - Make your first corn purchase (200 corn)
- **🌽 Corn Collector** - Collect 1,000 corn
- **🚜 Farm Supporter** - Collect 2,500 corn  
- **👑 Corn Master** - Collect 5,000 corn

## 📊 Statistics Tracking

Monitor your farming impact:
- **Efficiency**: Purchase success rate
- **Sustainability**: Achievement progress
- **Impact**: Overall contribution to the farm

## 🛠️ Technical Architecture

### Frontend Stack
- **Vite**: Fast build tool and development server
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety and better developer experience
- **Material UI**: Professional component library
- **Framer Motion**: Smooth animations and transitions
- **Custom Hooks**: Reusable logic for corn purchases and state management

### Backend Stack
- **Express.js**: Fast, minimalist web framework
- **express-rate-limit**: Rate limiting middleware
- **CORS**: Cross-origin resource sharing support
- **In-memory storage**: Simple rate limit tracking (Redis recommended for production)

### Development Features
- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Full type safety across the application
- **ESLint**: Code quality and consistency
- **Responsive Design**: Mobile-first approach with Material UI breakpoints

## 🌱 Bob's Fair Trade Philosophy

This application demonstrates Bob's commitment to sustainable farming:

1. **Rate Limiting**: Prevents overconsumption and ensures fair distribution
2. **Quality Control**: Limited purchases maintain premium corn quality
3. **Community Support**: Fair trade practices support local farming
4. **Sustainability**: Encourages mindful consumption patterns

## 🚀 Production Deployment

### Frontend Deployment
\`\`\`bash
npm run build
\`\`\`
Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.)

### Backend Deployment
- Replace in-memory storage with Redis or database
- Add environment variable configuration
- Implement proper logging and monitoring
- Add SSL/TLS encryption
- Configure production CORS settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Bob's Corn Farm for inspiring sustainable agriculture
- Material UI team for the excellent component library
- Framer Motion for smooth animations
- The open-source community for making this possible

---

**Happy Corn Farming! 🌽🚜**

*Remember: Every purchase supports sustainable farming practices and helps maintain fair prices for our farming community.*
