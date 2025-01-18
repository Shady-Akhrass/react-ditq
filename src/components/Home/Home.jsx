import React from 'react';
import { Helmet } from 'react-helmet-async';

import NewsSection from './NewsSection';
import MessageSection from './MessageSection';
import YouTubeSection from './YouTubeSection';
import GeniusesSection from './GeniusesSection';
import ProjectsSection from './ProjectsSection';
import SoundSection from './SoundSection';
import SliderSection from './SliderSection';
import AchievementsSection from './AchievementsSection';
const Home = () => {
  return (
    <>
      <Helmet>
        <title>دار الإتقان - الصفحة الرئيسية</title>
      </Helmet>
      <main className="flex-grow">
        <SliderSection />
        <NewsSection />
        <MessageSection />
        <YouTubeSection />
        <AchievementsSection />
        <GeniusesSection />
        <ProjectsSection />
        <SoundSection />
      </main>
    </>
  );
};

export default Home;
