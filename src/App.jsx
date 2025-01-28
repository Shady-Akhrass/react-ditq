import React from 'react';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Navigate,
    UNSAFE_DataRouterStateContext,
    UNSAFE_useScrollRestoration 
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Base/Header';
import AllNewsPage from './components/news/NewsCards';
import NewsDetails from './components/news/NewsDetails';
import ActivitiesSection from './components/ItqnSections/ActivitiesSection';
import DiwanSection from './components/ItqnSections/DiwanSection';
import CoursesSection from './components/ItqnSections/CoursesSection';
import MemorizationSection from './components/ItqnSections/MemorizationSection';
import CreativeSection from './components/ItqnSections/CreativeSection';
import Footer from './components/Base/Footer';
import Home from './components/Home/Home';
import FloatingButtons from './components/Home/FloatingButtons';
import Clues from './components/Clues/Clues';
import ContactSection from './components/Contact/ContactSection';
import Speech from './components/About/Speech';
import Branches from './components/About/Branches';
import Mission from './components/About/Mission'
function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="font-sans leading-normal tracking-normal">
          <Header />
          <main>
            <Routes>
              {/* Handle /itqan redirects */}
              <Route
                path="/itqan"
                element={<Navigate to="/" replace />}
              />
              <Route
                path="/itqan/:path*"
                element={<Navigate to={`/${window.location.pathname.split('/itqan/')[1]}`} replace />}
              />

              {/* Regular routes */}
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/home"
                element={<Home />}
              />
              <Route path="/news" element={<AllNewsPage />} />
              <Route path="/news/:title/details" element={<NewsDetails />} />
              <Route path="/:id/details" element={<NewsDetails />} /> {/* Add this new route */}
              <Route path="/activity" element={<ActivitiesSection />} />
              <Route path="/diwan" element={<DiwanSection />} />
              <Route path="/course" element={<CoursesSection />} />
              <Route path="/memorization" element={<MemorizationSection />} />
              <Route path="/creative" element={<CreativeSection />} />
              <Route path="/clues" element={<Clues />} />
              <Route path="/contact-us" element={<ContactSection />} />
              <Route path="/speech" element={<Speech />} />
              <Route path="/branche" element={<Branches />} />
              <Route path="/vision" element={<Mission />} />


            </Routes>
          </main>
          <FloatingButtons />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
