# Deployment Guide - Mobile Device & TestFlight

This guide will help you deploy the Pharmland app to your physical device and TestFlight.

## Prerequisites Checklist

- [ ] Node.js and npm installed
- [ ] Expo account (free) - [Sign up here](https://expo.dev/signup)
- [ ] Apple Developer Account ($99/year) - [Enroll here](https://developer.apple.com/programs/)
- [ ] Physical iOS device or Android device
- [ ] Firebase configured (✅ Already done!)

## Option 1: Quick Test with Expo Go (5 minutes)

**Fastest way to test on your physical device**

### Step 1: Install Expo Go
- Download from [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779) or [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2: Start Development Server
```bash
npm start
```

### Step 3: Scan QR Code
- **iOS**: Open Camera app, scan QR code
- **Android**: Open Expo Go app, scan QR code

**Note**: Expo Go has limitations. For full features, use Development Build (Option 2).

---

## Option 2: Development Build (Recommended - 15 minutes)

**Full native features, installed on your device like a real app**

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```
Enter your Expo credentials (or create account if needed).

### Step 3: Configure the Build
The project is already configured! Check `eas.json` for build profiles.

### Step 4: Build for Your Device

**For iOS (iPhone/iPad):**
```bash
eas build --profile development --platform ios
```

**For Android:**
```bash
eas build --profile development --platform android
```

### Step 5: Install on Device

**iOS:**
1. Build completes, you'll get a link
2. Open link on your iPhone/iPad
3. Tap "Install"
4. Go to Settings → General → VPN & Device Management
5. Trust the developer certificate
6. Open the app!

**Android:**
1. Build completes, download the APK
2. Transfer to your Android device
3. Enable "Install from Unknown Sources"
4. Install the APK

### Step 6: Start Development Server
```bash
npx expo start --dev-client
```

Your device will connect automatically!

---

## Option 3: TestFlight Deployment (30 minutes)

**Professional beta testing for iOS**

### Prerequisites
- Apple Developer account enrolled
- App Store Connect access

### Step 1: Update iOS Bundle Identifier

Open `app.json` and verify:
```json
{
  "ios": {
    "bundleIdentifier": "com.pharmland.mobile"
  }
}
```

### Step 2: Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click "My Apps" → "+" → "New App"
3. Fill in details:
   - **Platform**: iOS
   - **Name**: Pharmland
   - **Primary Language**: English
   - **Bundle ID**: Create new → `com.pharmland.mobile`
   - **SKU**: `pharmland-mobile-001`
4. Click "Create"

### Step 3: Configure EAS for TestFlight

Update `eas.json` submit section with your details:
```json
"submit": {
  "production": {
    "ios": {
      "appleId": "your-email@example.com",
      "ascAppId": "1234567890",
      "appleTeamId": "ABCDE12345"
    }
  }
}
```

**Find these values:**
- `appleId`: Your Apple ID email
- `ascAppId`: From App Store Connect → App Information → Apple ID
- `appleTeamId`: From [Apple Developer](https://developer.apple.com/account) → Membership

### Step 4: Build for TestFlight
```bash
eas build --platform ios --profile preview
```

This creates a production-ready build.

### Step 5: Submit to TestFlight
```bash
eas submit --platform ios --profile production
```

Or manually:
1. Download the IPA from EAS build link
2. Go to App Store Connect
3. Click your app → TestFlight
4. Click "+" next to Builds
5. Upload the IPA file

### Step 6: Add Internal Testers

1. In TestFlight section, click "Internal Testing"
2. Click "+" to add testers
3. Add email addresses
4. Testers receive invite via email
5. They install TestFlight app and accept invite

### Step 7: Test!

Testers can now:
- Install via TestFlight app
- Get automatic updates when you push new builds
- Provide feedback through TestFlight

---

## Quick Commands Reference

```bash
# Test locally
npm start

# Build development version (internal testing)
eas build --profile development --platform ios

# Build preview version (TestFlight ready)
eas build --profile preview --platform ios

# Build production version
eas build --profile production --platform ios

# Submit to App Store/TestFlight
eas submit --platform ios

# Check build status
eas build:list

# View build logs
eas build:view [build-id]
```

---

## Troubleshooting

### "No valid code signing identity found"
**Solution**:
```bash
eas credentials
```
Select iOS → Build Credentials → Set up new credentials

### "Bundle Identifier already exists"
**Solution**: Change bundle ID in `app.json`:
```json
"bundleIdentifier": "com.yourcompany.pharmland"
```

### Build fails with Firebase error
**Solution**: Verify `.env` file has correct Firebase values

### Can't install on device
**iOS**: Check device is added to provisioning profile
**Android**: Enable "Install Unknown Apps" in settings

### TestFlight upload rejected
Common fixes:
- Increment version in `app.json`
- Add missing app icons
- Complete export compliance in App Store Connect

---

## Updating Your App

### For Development Builds:
1. Make code changes
2. Start dev server: `npm start`
3. Changes appear instantly (hot reload)

### For TestFlight:
1. Make code changes
2. Increment version in `app.json`:
```json
"version": "1.0.1"
```
3. Build: `eas build --profile preview --platform ios`
4. Submit: `eas submit --platform ios`
5. Testers get update notification

---

## Production Deployment (App Store)

When ready for public release:

1. Build production version:
```bash
eas build --profile production --platform ios
```

2. Submit to App Store:
```bash
eas submit --platform ios --profile production
```

3. Complete App Store Connect setup:
   - Add screenshots
   - Write app description
   - Set pricing (free)
   - Submit for review

4. Wait for Apple approval (1-3 days)

5. Release to App Store!

---

## Cost Summary

- **Expo**: Free
- **Firebase**: Free (Spark plan sufficient)
- **Apple Developer**: $99/year (required for TestFlight & App Store)
- **Google Play**: $25 one-time (for Android release)
- **EAS Build**: 30 free builds/month

---

## Next Steps

1. ✅ Firebase is configured
2. Choose deployment method above
3. Test on your device
4. Gather feedback
5. Deploy to TestFlight
6. Release to App Store

Need help? Check [Expo Documentation](https://docs.expo.dev/build/introduction/) or reach out!
