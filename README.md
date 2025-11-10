# Pharmland Mobile App

A React Native mobile application for pharmacists to log clinical interventions and track their performance. Converted from a Next.js web application to React Native using Expo Router.

## Features

### For Pharmacists:
- Log clinical interventions with risk levels and outcomes
- Track personal performance metrics
- View analytics with charts (acceptance rate, risk distribution)
- Manage personal profile
- Dashboard with quick stats

### For Administrators:
- System-wide dashboard with aggregated metrics
- View all interventions across pharmacists
- User management (view users, change roles)
- Leaderboard showing top performing pharmacists
- System analytics and reporting

## Technology Stack

- **Framework**: React Native with Expo SDK 50
- **Routing**: Expo Router (file-based routing)
- **Backend**: Firebase (Authentication & Firestore)
- **UI Components**: Custom components with React Native
- **Charts**: React Native Chart Kit
- **State Management**: React Context API
- **Language**: TypeScript

## Project Structure

```
app/
├── (auth)/              # Authentication screens
│   ├── login.tsx
│   └── signup.tsx
├── (app)/               # Main app screens
│   ├── admin/          # Admin screens (tabs)
│   │   ├── dashboard.tsx
│   │   ├── interventions.tsx
│   │   ├── users.tsx
│   │   ├── leaderboard.tsx
│   │   └── profile.tsx
│   └── pharmacist/     # Pharmacist screens (tabs)
│       ├── dashboard.tsx
│       ├── interventions.tsx
│       ├── new-intervention.tsx
│       ├── analytics.tsx
│       └── profile.tsx
├── _layout.tsx         # Root layout with auth provider
└── index.tsx           # Entry point with route logic

components/              # Reusable UI components
├── Badge.tsx
├── Button.tsx
├── Input.tsx
├── LoadingScreen.tsx
└── StatCard.tsx

contexts/               # React contexts
└── AuthContext.tsx    # Authentication state management

lib/                    # Core libraries
├── firebase.ts        # Firebase initialization
├── firebaseService.ts # Firebase CRUD operations
└── utils.ts          # Helper functions

types/                  # TypeScript definitions
└── index.ts          # Type definitions for User, Intervention, etc.

constants/             # App constants
└── colors.ts         # Color palette
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication (Email/Password)
4. Create Firestore database
5. Get your Firebase configuration
6. Update `.env` file with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Set Up Firestore Database

Create the following collections in Firestore:

#### users collection:
```javascript
{
  email: string,
  fullName: string,
  role: "Administrator" | "Pharmacist",
  profileCompleted: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### interventions collection:
```javascript
{
  userId: string,
  problem: string,
  medicationIds: array,
  risk: "Low" | "Moderate" | "High" | "Extreme",
  outcome: "Accepted" | "Not Accepted" | "Pending",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### medications collection (optional):
```javascript
{
  name: string,
  createdAt: timestamp
}
```

### 4. Run the App

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Use tunnel for testing on physical devices
npm run tunnel
```

## Data Migration from Web App

If you're migrating from the Next.js web app:

1. Export data from your existing Firebase project
2. Import into the new Firebase project (or use the same project)
3. Ensure all collections follow the structure above
4. User roles should be either "Administrator" or "Pharmacist"
5. All timestamps should use Firebase Timestamp format

## User Roles

### Pharmacist:
- Default role for new signups
- Access to personal dashboard and interventions
- Can log new interventions
- View personal analytics

### Administrator:
- Full system access
- Can view all interventions
- Can manage users and change roles
- Access to system-wide analytics and leaderboard

## Development Notes

- Uses Expo managed workflow (no native code)
- Tab-based navigation for main screens
- Stack navigation for auth flow
- Firebase Authentication with AsyncStorage persistence
- Real-time data updates from Firestore
- Form validation on all input screens
- Toast notifications for user feedback
- Loading states on all async operations

## Common Issues

### Firebase Configuration
- Make sure all Firebase config values are correctly set in `.env`
- Check that Firebase project has Authentication and Firestore enabled
- Verify Firestore security rules allow authenticated access

### Build Issues
- Clear cache: `npm run clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Reset Expo: `npx expo start --clear`

## Future Enhancements

- Push notifications for intervention updates
- Offline support with local caching
- Export data to CSV/PDF
- Advanced filtering and search
- Medication database integration
- Real-time collaboration features

## License

Proprietary - All rights reserved
