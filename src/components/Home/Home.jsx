import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

// Import only the SliderSection eagerly as it's above the fold
import SliderSection from './SliderSection';

// Lazy load all other sections
const NewsSection = React.lazy(() => import(/* webpackChunkName: "news" */ './NewsSection'));
const MessageSection = React.lazy(() => import(/* webpackChunkName: "message" */ './MessageSection'));
const YouTubeSection = React.lazy(() => import(/* webpackChunkName: "youtube" */ './YouTubeSection'));
const GeniusesSection = React.lazy(() => import(/* webpackChunkName: "geniuses" */ './GeniusesSection'));
const ProjectsSection = React.lazy(() => import(/* webpackChunkName: "projects" */ './ProjectsSection'));
const SoundSection = React.lazy(() => import(/* webpackChunkName: "sound" */ './SoundSection'));
const AchievementsSection = React.lazy(() => import(/* webpackChunkName: "achievements" */ './AchievementsSection'));

// Simple loading component
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <>
      <Helmet>
        <title>دار الإتقان - الصفحة الرئيسية</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://api.ditq.org" />
      </Helmet>

      <main className="flex-grow">
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <SliderSection />

          <Suspense fallback={<SectionLoader />}>
            <NewsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <MessageSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <YouTubeSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <AchievementsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <GeniusesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <SoundSection />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default Home;
