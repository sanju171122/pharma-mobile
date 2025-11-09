# Pharmland Mobile App

A React Native mobile application for pharmacists to log clinical interventions and track their performance.

## Features

- User authentication (Login/Signup)
- Role-based access (Pharmacist/Administrator)
- Log clinical interventions
- View analytics and performance metrics
- Manage favorites and templates
- Admin dashboard for user management
- Reference data management

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Firebase:
   - Add your Firebase configuration in `src/config/firebase.js`

3. Run the app:
   ```bash
   # For iOS
   npm run ios

   # For Android
   npm run android
   ```

## Technology Stack

- React Native with Expo
- Firebase (Authentication & Firestore)
- React Navigation
- React Native Paper (UI Components)
- React Hook Form
- Chart Kit for visualizations

## Project Structure

```
src/
├── config/          # Firebase configuration
├── context/         # React contexts (Auth)
├── screens/         # All app screens
├── navigation/      # Navigation setup
├── components/      # Reusable components
├── lib/            # Utilities and helpers
├── types/          # TypeScript types
└── utils/          # Utility functions
```
