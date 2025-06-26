# LifeBridge : Fastest way to check blood availability, and donate in emergencies

A blood donation platform that helps people find blood banks with live updated data, check blood availability in real-time, locate nearest blood banks based on location, and submit blood donation forms directly to blood banks.

##  Problem We're Solving

When someone needs blood urgently, it's very difficult to:
- Find which blood banks have the required blood type
- Know if blood is actually available right now
- Find the closest blood bank to their GPS  location
- Contact blood banks quickly for donations
- Get proper information about blood donation process

##  Our Solution

LifeBridge solves these problems by providing:

- **Live Blood Availability**: Real-time updates showing which blood types are available/unavailable at each blood bank
- **Nearest Blood Bank Finder**: Find the closest blood banks to your location with distance and contact details
- **Blood Donation Form**: Easy form to register as a donor that gets sent directly to blood banks
- **Daily Updated Data**: Blood banks update their inventory daily so you always see current information
- **Blood Bank Search**: Search blood banks by location, blood type, and availability
- **Blood Donation Info**: Complete guide about blood donation process, eligibility, and compatibility

## 🛠️ Technologies Used

### Frontend
- **React.js** - Main website interface

- **CSS3** - Website design and styling
- **React Toastify** - Show messages to users
- **Vite** - Website building tool

### Backend
- **Node.js** - Server to handle requests
- **Express.js** - API framework
- **Mongo Atlas** - Database to store blood bank and donor data
- **Mongoose** - Database connection and data handling

### Messaging Service

- We use **Twilio** for sending SMS. Whenever a user submits a blood donation form our system sends real-time SMS alerts to blood banks using Twilio’s messaging service.
<br><br>
## 🚀 How to Run



### Frontend Deployment

1. **Go to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install packages:**
   ```bash
   npm install
   ```

3. **Build website:**
   ```bash
   npm run build
   ```

### Backend Deployment

1. **Go to backend folder:**
   ```bash
   cd backend
   ```

2. **Install packages:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   Create `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```



### Local Development

1. **Download project:**
   ```bash
   git clone <repository-url>
   cd LifeBridge
   ```
<br>


## 📄 License

This project uses  GPL 3.0 License - see [LICENSE](LICENSE) file for details.

##

**Built to save lives by making blood donation easier and faster**
