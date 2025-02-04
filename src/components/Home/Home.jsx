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

// Improved loading component with containment
const SectionWrapper = ({ children }) => (
  <section className="min-h-[300px] md:min-h-[400px] w-full relative contain-content">
    <div className="h-full w-full">
      {children}
    </div>
  </section>
);

const SectionLoader = () => (
  <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-50">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Helmet>
        <title>دار الإتقان - الصفحة الرئيسية</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://api.ditq.org" />
      </Helmet>

      <main className="flex-grow">
        <ErrorBoundary fallback={<div className="text-center py-8">Something went wrong</div>}>
          <SectionWrapper>
            <SliderSection />
          </SectionWrapper>

          <div className="space-y-8">
            {[
              { Component: NewsSection, id: 'news' },
              { Component: MessageSection, id: 'message' },
              { Component: YouTubeSection, id: 'youtube' },
              { Component: AchievementsSection, id: 'achievements' },
              { Component: GeniusesSection, id: 'geniuses' },
              { Component: ProjectsSection, id: 'projects' },
              { Component: SoundSection, id: 'sound' }
            ].map(({ Component, id }) => (
              <SectionWrapper key={id}>
                <Suspense fallback={<SectionLoader />}>
                  <Component />
                </Suspense>
              </SectionWrapper>
            ))}
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Home;
