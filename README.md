# News Aggregator

This repository provides a minimal setup to get a React application working with TypeScript and Vite. It includes HMR (Hot Module Replacement) and some ESLint rules for better code quality.

## Languages Used
- **TypeScript**: 92.4%
- **CSS**: 5.2%
- **JavaScript**: 1.6%
- **Other**: 0.8%

## Available Scripts

In the project directory, you can run:

### `npm install --legacy-peer-deps`
Install the dependencies.
The reason you need to run with the `--legacy-peer-deps` flag is to bypass peer dependency conflicts that may arise during the installation process. This flag tells npm to use the older peer dependency resolution algorithm, which is more lenient and allows the installation to proceed even if there are conflicting peer dependencies.

In this case, the error message indicates a conflict between react-day-picker@8.10.1 and date-fns@4.1.0. Using the `--legacy-peer-deps` flag helps to resolve this conflict by ignoring the peer dependency requirements and proceeding with the installation.

The main reason of this is for the use of shadcn with tailwind 4 and React 19. Check it out [here](https://ui.shadcn.com/docs/react-19)

### `npm run dev`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`
Runs ESLint to analyze your code and fix problems automatically.

### `npm run type-check`
Checks for type errors using TypeScript.

### `npm run preview`
Serves the production build locally to preview before deployment.

### `npm run prepare`
Sets up Husky for Git hooks.

## Running the Project with Docker

To run this project with Docker, execute the following commands:

### Build the Docker image

```sh
docker build . -t "news-aggregator:v1.0"
```

### Run the Docker container

```sh
docker run -dp 3000:80 news-aggregator:v1.0
```

This will build the Docker image and start the container. Your React app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

### `.env`

```plaintext
VITE_NEWS_API_KEY=your_newsapi_key
VITE_NEW_YORK_TIMES_API_KEY=your_nytimes_key
```

You can obtain the API keys from:
- [News API](https://newsapi.org)
- [New York Times Developer](https://developer.nytimes.com)