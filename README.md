# INES Connect

A social web application for college students in Rwanda, starting with INES-Ruhengeri as the pilot institution. Connect, share ideas, and collaborate with fellow students.

## Features

### Core Features
- **User Profiles**: Create profiles with name, photo, faculty, and year of study
- **Social Feed**: Post text, images, or event announcements
- **Interactions**: Like, comment, and reply to posts
- **Find Friends**: Search and connect with other students
- **Real-time Chat**: Private messaging system
- **Event Board**: Post and discover campus events
- **Campus Groups**: Join groups based on faculty or interests

### UI/UX Features
- **Rwandan-inspired Theme**: Warm tones and modern design
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on desktop and mobile
- **Modern Interface**: Clean, youth-friendly design

### Technical Features
- **Real-time Updates**: Live chat and notifications
- **Scalable Architecture**: Easy to extend to other colleges
- **Firebase Integration**: Authentication, database, and storage
- **TypeScript**: Type-safe development

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Deployment**: Netlify/Vercel ready

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### 1. Clone and Install Dependencies

```bash
cd ines-connect
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore database
5. Enable Storage
6. Get your Firebase config

### 3. Configure Firebase

Update `src/services/firebase.ts` with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Firestore Security Rules

Set up your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Posts are readable by all authenticated users
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.authorId == request.auth.uid || 
         request.auth.uid in resource.data.admins);
    }
    
    // Comments are readable by all authenticated users
    match /posts/{postId}/comments/{commentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
    
    // Chats are only accessible by participants
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
    
    // Messages are only accessible by chat participants
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
    }
    
    // Campus groups are readable by all authenticated users
    match /campusGroups/{groupId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        request.auth.uid in resource.data.admins;
    }
  }
}
```

### 5. Run the Application

```bash
npm start
```

The app will be available at `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
```

## Deployment

### Netlify Deployment

1. Build the project: `npm run build`
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy!

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Project Structure

```
ines-connect/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PostCard.tsx
│   │   ├── CreatePost.tsx
│   │   └── LoadingSpinner.tsx
│   ├── pages/              # Main application pages
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Feed.tsx
│   │   ├── Explore.tsx
│   │   ├── Chat.tsx
│   │   ├── Events.tsx
│   │   ├── Groups.tsx
│   │   └── Profile.tsx
│   ├── services/           # Firebase and API services
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   └── database.ts
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── hooks/              # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # App entry point
│   └── index.css           # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Features in Detail

### User Authentication
- Email/password registration and login
- Profile creation with faculty and year selection
- Interest selection during registration
- Profile photo upload (Firebase Storage)

### Social Feed
- Create text posts and event announcements
- Like and comment on posts
- Real-time updates using Firestore listeners
- Image support for posts

### Find Friends
- Search students by name, faculty, or interests
- View student profiles
- Send connection requests

### Real-time Chat
- Private messaging between students
- Real-time message updates
- Message read status
- Chat list with last message preview

### Event Board
- Create and share campus events
- Event details (date, location, organizer)
- Filter events by upcoming/past
- Event interest tracking

### Campus Groups
- Create groups by faculty, interest, or club
- Join existing groups
- Group member management
- Group-specific discussions

### Theme System
- Dark/light mode toggle
- Rwandan-inspired color palette
- Responsive design for all devices
- Modern, clean interface

## Future Enhancements

- Push notifications
- File sharing in chat
- Video calls integration
- Mobile app (React Native)
- Advanced search filters
- Event calendar integration
- Study group formation
- Academic resource sharing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

**INES Connect** - Connecting Rwanda's Future 🌟

