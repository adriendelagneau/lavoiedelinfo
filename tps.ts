// pages/index.js

import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Run the cron job every 24 hours (24 * 60 * 60 * 1000 milliseconds)
    const cronJobInterval = 24 * 60 * 60 * 1000;

    const runCronJob = async () => {
      try {
        // Call your cron endpoint
        const response = await fetch('/api/cron');
        const data = await response.json();

        console.log(data.message);
      } catch (error) {
        console.error('Error calling cron endpoint:', error);
      }
    };

    // Run the cron job immediately when the component mounts
    runCronJob();

    // Set up the interval to run the cron job every 24 hours
    const intervalId = setInterval(runCronJob, cronJobInterval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return <div>Welcome to Next.js!</div>;
};

export default Home;
