SoarTask Admin Dashboard
A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. This dashboard provides financial management features including card overview, transaction tracking, expense analytics, and user profile management.

Dashboard Overview

Features
📊 Dashboard with real-time financial analytics
💳 Credit card management and transaction history
📈 Interactive charts for expense tracking and balance history
👤 User profile and settings management
🔒 Secure authentication system
📱 Fully responsive design for mobile, tablet, and desktop
Tech Stack
React 18 with TypeScript
Tailwind CSS for styling
Chart.js for data visualization
Zustand for state management
React Router for navigation
Vite for fast development and building
Getting Started
Follow these steps to set up the project on your local machine.

Prerequisites
Node.js (v16.0.0 or higher)
npm or yarn
Installation
Clone the repository:
bash
Copy
1
2
git clone https://github.com/yourusername/soartask-admin-dashboard.git
cd soartask-admin-dashboard
Install dependencies:
bash
Copy
1
2
3
npm install

# or

yarn install
Start the development server:
bash
Copy
1
2
3
npm run dev

# or

yarn dev
Open your browser and navigate to:
Copy
1
http://localhost:5173
Build for Production
To create a production build:

bash
Save
Copy
1
2
3
npm run build

# or

yarn build
Preview the production build:

bash
Save
Copy
1
2
3
npm run preview

# or

yarn preview
Project Structure
Run
Save
Copy
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
soartask-admin-dashboard/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, fonts, and other assets
│ ├── components/ # React components
│ │ ├── common/ # Shared UI components
│ │ ├── dashboard/ # Dashboard-specific components
│ │ ├── layout/ # Layout components (Sidebar, Header)
│ │ └── settings/ # Settings page components
│ ├── hooks/ # Custom React hooks
│ ├── mock/ # Mock data for development
│ ├── pages/ # Page components
│ ├── store/ # Zustand state management
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main App component
│ └── main.tsx # Entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── vite.config.ts # Vite configuration
Available Scripts
dev: Start the development server
build: Build for production
preview: Preview the production build
lint: Run ESLint to check for code issues
typecheck: Run TypeScript to check for type issues
Customization
Tailwind Configuration
You can customize the Tailwind configuration in tailwind.config.js:

js
Save
Copy
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
⌄
⌄
⌄
⌄
⌄
module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: {
extend: {
colors: {
primary: {
50: '#eef2ff',
// ... other shades
700: '#4338ca',
},
},
},
},
plugins: [],
}
Mock Data
During development, the app uses mock data located in the src/mock directory. You can modify these files to test different scenarios.

Development Guidelines
Component Structure : Follow the atomic design pattern. Create small, reusable components in the common folder and compose them into larger components.
State Management : Use Zustand for global state. Keep component state local when possible.
Responsive Design : Always design with mobile-first approach. Test on multiple screen sizes.
TypeScript : Maintain strict typing. Create interfaces for all components and data structures.
Code Formatting : The project uses ESLint and Prettier for consistent code formatting.
Contributing
Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to the branch: git push origin feature/amazing-feature
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
UI design inspired by modern financial dashboards
Chart.js for beautiful data visualization
Tailwind CSS for rapid UI development
Common Issues and Solutions
Images Not Loading
If you're experiencing issues with images not loading:

bash
Save
Copy
1
2

# Make sure you have the required image assets in src/assets

npm run dev:setup-assets
Chart.js Integration
For Chart.js issues, ensure you've properly registered the required components:

tsx
Save
Copy
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
import {
Chart,
ArcElement,
LineElement,
BarElement,
PointElement,
LineController,
BarController,
CategoryScale,
LinearScale,
Legend,
Tooltip
} from 'chart.js';

Chart.register(
ArcElement,
LineElement,
BarElement,
PointElement,
LineController,
BarController,
CategoryScale,
LinearScale,
Legend,
Tooltip
);
For any additional questions or support, please open an issue on the GitHub repository.

Happy coding! 🚀
