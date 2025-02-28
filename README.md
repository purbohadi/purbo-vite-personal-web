# SoarTask Admin Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. This dashboard provides financial management features including card overview, transaction tracking, expense analytics, and user profile management.

## Features

- 📊 Dashboard with real-time financial analytics
- 💳 Credit card management and transaction history
- 📈 Interactive charts for expense tracking and balance history
- 👤 User profile and settings management
- 🔒 Secure authentication system
- 📱 Fully responsive design for mobile, tablet, and desktop

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **Zustand** for state management
- **React Router** for navigation
- **Vite** for fast development and building

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/soartask-admin-dashboard.git
cd soartask-admin-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

### Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
soartask-admin-dashboard/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, fonts, and other assets
│   ├── components/        # React components
│   │   ├── common/        # Shared UI components
│   │   ├── dashboard/     # Dashboard-specific components
│   │   ├── layout/        # Layout components (Sidebar, Header)
│   │   └── settings/      # Settings page components
│   ├── hooks/             # Custom React hooks
│   ├── mock/              # Mock data for development
│   ├── pages/             # Page components
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Available Scripts

- `dev`: Start the development server
- `build`: Build for production
- `preview`: Preview the production build
- `lint`: Run ESLint to check for code issues
- `typecheck`: Run TypeScript to check for type issues

## Customization

### Tailwind Configuration

You can customize the Tailwind configuration in `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          // ... other shades
          700: "#4338ca",
        },
      },
    },
  },
  plugins: [],
};
```

### Mock Data

During development, the app uses mock data located in the `src/mock` directory. You can modify these files to test different scenarios.

## Development Guidelines

1. **Component Structure**: Follow the atomic design pattern. Create small, reusable components in the `common` folder and compose them into larger components.

2. **State Management**: Use Zustand for global state. Keep component state local when possible.

3. **Responsive Design**: Always design with mobile-first approach. Test on multiple screen sizes.

4. **TypeScript**: Maintain strict typing. Create interfaces for all components and data structures.

5. **Code Formatting**: The project uses ESLint and Prettier for consistent code formatting.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI design inspired by modern financial dashboards
- Chart.js for beautiful data visualization
- Tailwind CSS for rapid UI development

## Common Issues and Solutions

### Images Not Loading

If you're experiencing issues with images not loading:

```bash
# Make sure you have the required image assets in src/assets
npm run dev:setup-assets
```

### Chart.js Integration

For Chart.js issues, ensure you've properly registered the required components:

```tsx
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
  Tooltip,
} from "chart.js";

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
```

For any additional questions or support, please open an issue on the GitHub repository.

Happy coding! 🚀
