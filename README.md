# Teens Helpline — Student Dashboard

A premium, production-ready student dashboard for **Teens Helpline** built with Next.js 15, MongoDB Atlas, and a beautiful green brand identity.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```

**Minimum required for the app to run:**
- `MONGODB_URI` — Your MongoDB Atlas connection string
- `JWT_SECRET` — Any secure random string (min 32 chars)

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/              # Login, Register, Forgot Password
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── dashboard/       # Home page
│   │   ├── book-counselling/
│   │   ├── career-guidance/
│   │   ├── book-tutor/
│   │   ├── my-sessions/
│   │   ├── mood-tracker/
│   │   ├── journal/
│   │   ├── blogs/
│   │   ├── community/
│   │   ├── messages/
│   │   ├── notifications/
│   │   ├── payments/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── layout.tsx       # Dashboard shell
│   ├── api/                 # API routes
│   │   ├── auth/            # login, register, logout, me
│   │   └── ai-buddy/        # AI Buddy chat
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx      # Collapsible sidebar
│   │   └── Topbar.tsx       # Top navigation
│   ├── ai-buddy/
│   │   ├── AIBuddy.tsx      # Floating chat widget
│   │   └── AIBuddyProvider.tsx
│   ├── widgets/
│   │   └── EmergencyButton.tsx
│   └── providers.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── brand.ts             # Brand constants
│   ├── mongodb.ts           # DB connection
│   ├── auth.ts              # JWT helpers
│   └── utils.ts             # Utility functions
├── models/                  # Mongoose schemas
│   ├── User.ts
│   ├── Student.ts
│   ├── Counsellor.ts
│   ├── Tutor.ts
│   ├── Appointment.ts
│   ├── MoodEntry.ts
│   ├── JournalEntry.ts
│   ├── BlogPost.ts
│   ├── Notification.ts
│   ├── CommunityPost.ts
│   └── Payment.ts
├── middleware.ts            # Route protection
└── .env.local.example
```

---

## 🎨 Design System

**Brand Colors:**
- Primary Green: `#203A2A`
- Sage: `#DDE8C8`
- Lime Accent: `#CFE78A`
- Background: `#F7F7F3`

**Typography:**
- Display: Outfit
- Body: Inter

---

## 🔧 Key Features

| Feature | Status |
|---------|--------|
| JWT Auth (httpOnly cookies) | ✅ |
| MongoDB Atlas integration | ✅ |
| Collapsible Sidebar | ✅ |
| AI Buddy (rule-based + API-ready) | ✅ |
| Dashboard Home | ✅ |
| Book Counselling | ✅ |
| Book Tutor | ✅ |
| Career Guidance | ✅ |
| Mood Tracker | ✅ |
| My Sessions | ✅ |
| Blogs | ✅ |
| Notifications | ✅ |
| Payments | ✅ |
| Profile | ✅ |
| Settings (dark mode, notifications) | ✅ |
| Emergency Help Button | ✅ |
| Framer Motion animations | ✅ |
| Dark Mode | ✅ |
| Fully Responsive | ✅ |

---

## 🌐 Website Integration

The dashboard is integrated with the Teens Helpline public website:
- **Logo** in sidebar → links to public website
- **"Back to Website"** button in topbar
- **"Visit Website"** in sidebar footer
- Shared brand tokens via `lib/brand.ts`

---

## 🤖 AI Buddy

The AI Buddy is a rule-based conversational assistant that:
- Gives career guidance
- Provides mood support
- Suggests study plans
- Recommends sessions and resources

To switch to OpenAI: Set `AI_PROVIDER=openai` and `OPENAI_API_KEY` in `.env.local`

---

## 🔐 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT stored in httpOnly cookies
- Route protection via middleware
- Role-based access (student / counsellor / admin)

---

## 📧 Support

For issues, contact [help@teenshelpline.com](mailto:help@teenshelpline.com)
