import React, { lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';

const Header = lazy(() => import('./components/Base/Header'));
const AllNewsPage = lazy(() => import('./components/news/NewsCards'));
const NewsDetails = lazy(() => import('./components/news/NewsDetails'));
const ActivitiesSection = lazy(() => import('./components/ItqnSections/ActivitiesSection'));
const DiwanSection = lazy(() => import('./components/ItqnSections/DiwanSection'));
const CoursesSection = lazy(() => import('./components/ItqnSections/CoursesSection'));
const MemorizationSection = lazy(() => import('./components/ItqnSections/MemorizationSection'));
const CreativeSection = lazy(() => import('./components/ItqnSections/CreativeSection'));
const Footer = lazy(() => import('./components/Base/Footer'));
const Home = lazy(() => import('./components/Home/Home'));
const FloatingButtons = lazy(() => import('./components/Home/FloatingButtons'));
const Clues = lazy(() => import('./components/Clues/Clues'));
const ContactSection = lazy(() => import('./components/Contact/ContactSection'));
const Speech = lazy(() => import('./components/About/Speech'));
const Branches = lazy(() => import('./components/About/Branches'));
const Mission = lazy(() => import('./components/About/Mission'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                  path="/itqan/:path/*"  // Fixed splat syntax
                  element={<Navigate to={`/${window.location.pathname.split('/itqan/')[1] || ''}`} replace />}
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
          {/* Remove ScrollRestoration component as it's not needed for this use case */}
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
