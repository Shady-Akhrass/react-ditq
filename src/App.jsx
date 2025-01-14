import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeaturedBrandCarousel from './components/Home/FeaturedBrandCarousel';
import NewsSection from './components/Home/NewsSection';
import MessageSection from './components/Home/MessageSection';
import YouTubeSection from './components/Home/YouTubeSection';
import AchievementsSection from './components/Home/AchievementsSection';
import GeniusesSection from './components/Home/GeniusesSection';
import ProjectsSection from './components/Home/ProjectsSection';
import PartnersSection from './components/Home/PartnersSection';
import SoundSection from './components/Home/SoundSection';
import SliderSection from './components/Home/SliderSection';
import Header from './components/Base/Header';
import AllNewsPage from './components/news/NewsCards'; // Import the AllNewsPage component
import NewsDetails from './components/news/NewsDetails'; // Import the NewsDetails component
import ActivitiesSection from './components/ItqnSections/ActivitiesSection'; // Import the ActivitiesSection component
import DiwanSection from './components/ItqnSections/DiwanSection';
import CoursesSection from './components/ItqnSections/CoursesSection';
import MemorizationSection from './components/ItqnSections/MemorizationSection';
import CreativeSection from './components/ItqnSections/CreativeSection';

function App() {
  return (
    <Router>
      <div className="font-sans leading-normal tracking-normal">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SliderSection />
                  <NewsSection />
                  <MessageSection />
                  <YouTubeSection />
                  {/* <AchievementsSection /> */}
                  <GeniusesSection />
                  <ProjectsSection />
                  <SoundSection />
                </>
              }
            />
            <Route
              path="/home"
              element={
                <>
                  <SliderSection />
                  <NewsSection />
                  <MessageSection />
                  <YouTubeSection />
                  {/* <AchievementsSection /> */}
                  <GeniusesSection />
                  <ProjectsSection />
                  <SoundSection />
                </>
              }
            />
            <Route path="/news" element={<AllNewsPage />} />
            {/* <Route path="/news/:title/details" element={<NewsDetails />} />
            <Route path="/news/:id/details" element={<NewsDetails />} /> */}
            <Route path="/news/:id/:title" element={<NewsDetails />} />
            <Route path="/activities-section" element={<ActivitiesSection />} />
            <Route path="/diwan-section" element={<DiwanSection />} />
            <Route path="/courses-section" element={<CoursesSection />} />
            <Route path="/memorization-section" element={<MemorizationSection />} />
            <Route path="/creatives-section" element={<CreativeSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
