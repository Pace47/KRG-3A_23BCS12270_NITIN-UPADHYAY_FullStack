# 🌱 EcoTrack – Smart Sustainability Dashboard

EcoTrack is a modern React-based sustainability tracking dashboard that helps users monitor their eco-friendly activities and daily wellness habits.

This project demonstrates routing, authentication, Redux state management, performance optimization, API integration, and Tailwind CSS styling.

---

## 🚀 Features

### 🔐 Authentication
- Simple login system
- Authentication state stored using Context + localStorage
- Protected routes
- Redirects unauthenticated users to `/login`

---

### 💧 Daily Water Tracker
- Add water intake
- Remove water intake
- Reset daily count
- Set custom daily goal
- Progress bar with percentage
- “Goal Reached” indicator
- Persistent data using localStorage
- StrictMode-safe implementation (lazy state initialization)

#### 🌿 Health Tip API
Fetches daily advice from:
https://api.adviceslip.com/advice

Includes:
- Loading state
- Error handling

---

### 🌱 Activity Logs (Redux Toolkit)
- Async data fetching using `createAsyncThunk`
- Loading / Success / Error states
- Displays carbon emission activities
- Color-coded badges:
  - 🔴 High carbon emission
  - 🟢 Low carbon emission

---

### ⚡ Performance Optimization
- `React.memo()` for CounterDisplay component
- `useCallback()` for event handlers
- Prevents unnecessary re-renders
- StrictMode compatible

---

## 🛠️ Tech Stack

- React 18+
- React Router DOM
- Redux Toolkit
- React Context API
- Tailwind CSS
- JavaScript (ES6+)

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── CounterDisplay.jsx
│
├── pages/
│   ├── WaterTracker.jsx
│   ├── Log.jsx
│
├── store/
│   ├── logSlice.js
│   ├── store.js
│
├── context/
│   ├── AuthContext.jsx
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone <your-repo-url>
cd ecotrack
```

### 2. Install dependencies

```
npm install
```

### 3. Start development server

```
npm run dev
```

---

## 🔒 Protected Routes Logic

- If user is not authenticated → redirect to `/login`
- Authentication token stored in localStorage
- Context API manages auth state

---

## 💾 Persistent Storage

Water tracker uses:

```
localStorage.setItem("waterData", JSON.stringify({ count, goal }))
```

Uses lazy state initialization to avoid reset issues in React StrictMode.

---

## 🧠 Redux Flow

1. `dispatch(fetchLogs())`
2. Status changes to `loading`
3. On success → data stored in `state.logs.data`
4. UI renders filtered logs

---

## 🎯 Learning Outcomes

This project demonstrates:

- Advanced React Hooks usage
- Redux async state management
- Routing and protected navigation
- API integration
- Performance optimization
- Tailwind responsive UI
- StrictMode-safe coding practices

---

## 🌟 Future Improvements

- Daily activity history
- Carbon emission charts
- Dark mode
- Water reminder notifications
- Achievement badge system

---

## 👨‍💻 Author

Your Name  
Frontend Developer | React Developer