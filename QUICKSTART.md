# Quick Start Guide

Get your Pharmland mobile app running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- Expo CLI (will be installed automatically)
- iOS Simulator (Mac) or Android Emulator
- Firebase account

## Step 1: Install Dependencies (30 seconds)

```bash
npm install
```

## Step 2: Configure Firebase (2 minutes)

### Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new one)
3. Click the gear icon → Project Settings
4. Scroll to "Your apps" section
5. Click the Web icon (`</>`) to create a web app
6. Copy the configuration values

### Update .env File

Open `.env` and replace with your values:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxX
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## Step 3: Enable Firebase Services (1 minute)

In Firebase Console:

1. **Enable Authentication:**
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
   - Click Save

2. **Create Firestore Database:**
   - Go to Firestore Database
   - Click "Create database"
   - Start in **test mode** (change rules later)
   - Choose your region
   - Click Enable

## Step 4: Start the App (30 seconds)

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser
- Or scan QR code with Expo Go app on your phone

## Step 5: Create Your First Account (1 minute)

1. App will open to login screen
2. Click "Sign Up"
3. Enter:
   - Full Name: "Admin User"
   - Email: "admin@test.com"
   - Password: "test123"
4. Click "Create Account"

You're in! You'll see the Pharmacist dashboard.

## Make Yourself an Admin (Optional)

To access admin features:

1. Go to Firebase Console → Firestore Database
2. Find the `users` collection
3. Click on your user document
4. Edit the `role` field
5. Change value from "Pharmacist" to "Administrator"
6. Save
7. Restart the app

You'll now see the Admin dashboard with all system features!

## Testing the App

### As Pharmacist:
1. Go to "New" tab
2. Log an intervention
3. View it in "Interventions" tab
4. Check stats in "Dashboard"
5. View charts in "Analytics"

### As Administrator:
1. View system stats in "Dashboard"
2. See all interventions in "Interventions"
3. Manage users in "Users" tab
4. View rankings in "Leaderboard"

## Troubleshooting

### "Firebase config not found"
- Check `.env` file has correct values
- Restart the app: Press `r` in terminal

### "Authentication failed"
- Verify Email/Password is enabled in Firebase Console
- Check Firebase project ID matches `.env`

### "Can't connect to Firestore"
- Make sure Firestore database is created
- Check you're in test mode or rules allow access

### App won't start
```bash
# Clear cache and restart
npm run clear
```

### Need help?
Check the full README.md for detailed documentation.

## Next Steps

- Add more users via signup
- Create sample interventions
- Set up Firestore security rules
- Customize the color scheme in `constants/colors.ts`
- Build for production with `expo build`

## Default Test Accounts

After setup, create these for testing:

**Pharmacist:**
- Email: pharmacist@test.com
- Password: test123
- Role: Pharmacist

**Admin:**
- Email: admin@test.com
- Password: test123
- Role: Administrator (change in Firestore)

Enjoy your Pharmland mobile app! 🎉
