
# AI Agent Quiz Platform

The AI Agent Quiz Platform is a dynamic, full-stack web application that allows users to generate, attempt, and manage quizzes powered by AI agents. It supports both authenticated and guest users with intelligent quiz features, auto-scoring, result tracking, and a responsive UI.

## Features

### Core Features
- **AI-Powered Quiz Generation**: Quizzes can be generated using an AI Agent based on selected topics, technologies, and difficulty levels.
- **Public Quizzes**: Explore a wide range of public quizzes without the need for login.
- **Private & User-Created Quizzes**: Authenticated users can create, manage, and attempt their own quizzes.
- **Real-Time Attempting**: Users can take quizzes directly and view results upon submission.
- **Result Analysis**: Correct and incorrect answers are shown along with explanations after submission.
- **Guest Mode**: Users can attempt a quiz without logging in and are prompted to login/signup before results are stored.
- **Personalized Recommendations**: Suggests quizzes based on user's past attempts and interests.
- **Leaderboard**: Global leaderboard showing top scorers across all public quizzes.

### Authentication
- Login and Signup using secure API endpoints.
- Token-based authentication using `localStorage`.

### Dashboard
- Personal dashboard for users to view and manage their created quizzes.
- Paginated view for easier navigation.

### UI/UX
- Clean, responsive interface using React, Tailwind CSS, and animated loaders.
- Feedback via toast notifications for actions like login, signup, submission, and errors.

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router DOM
- React Toastify

### Backend (Not included in this repo but used with)
- FastAPI
- SQLAlchemy (ORM)
- Postgre SQL (Database)

### Other
- Axios for API calls
- Local Storage for persisting auth tokens and quiz attempts
- Protected routes for user-only functionality

## Folder Structure (Frontend)

```
src/
├── components/         # Reusable UI components like QuizCard
├── context/            # Authentication context
├── pages/              # All page-level components (Login, Signup, Home, QuizAttempt, etc.)
├── services/           # API functions for quizzes and auth
├── App.jsx             # Main app routing
└── main.jsx            # Entry point
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/raghavendrareddy23/AI-Agent-Quiz-Frontend.git
   cd AI-Agent-Quiz-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```


4. **Run the development server**
   ```bash
   npm start
   ```

## How it Works (Quiz Flow)

- A user (or guest) selects or generates a quiz.
- On quiz submission:
  - If not logged in, the user is prompted to login or signup.
  - The quiz attempt data is saved temporarily.
  - After successful authentication, the attempt is automatically submitted and the user is redirected to the results page.

## Future Enhancements

- Leaderboards and ranking system based quiz individually
- Personalized quiz recommendations based on skill and past activity
- Category filtering and search for public quizzes
- Dark mode toggle
- Admin panel for managing users and quizzes
- Analytics dashboard for performance insights
- Suggessions based on domains 

## License

This project is licensed under the MIT License.

## Author

Developed by Raghavendra Reddy Munagala