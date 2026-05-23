import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalUiSounds from './components/GlobalUiSounds';
import ScrollToTop from './components/ScrollToTop';
import TravelConcierge from './components/TravelConcierge';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminDashboard from './admin/AdminDashboard';

const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const TourPackages = lazy(() => import('./pages/TourPackages.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Destinations = lazy(() => import('./pages/destinations/Destinations.jsx'));
const DestinationDetails = lazy(() => import('./pages/destinations/DestinationDetails.jsx'));
const TourDetails = lazy(() => import('./pages/tour/TourDetails.jsx'));
const Activity = lazy(() => import('./pages/activity/Activity.jsx'));
const ActivityDetails = lazy(() => import('./pages/activity/ActivityDetails.jsx'));
const Services = lazy(() => import('./pages/services/Services.jsx'));
const Blog = lazy(() => import('./pages/blog/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const PackageDetails = lazy(() => import('./pages/PackageDetails.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy.jsx'));
const TermsConditions = lazy(() => import('./pages/legal/TermsConditions.jsx'));
const ItineraryBuilder = lazy(() => import('./pages/ItineraryBuilder.jsx'));
const ItineraryResult = lazy(() => import('./pages/ItineraryResult.jsx'));

// SEO Optimized Landing Pages
const ChardhamYatraSEO = lazy(() => import('./pages/ChardhamYatraSEO.jsx'));
const KedarnathSEO = lazy(() => import('./pages/KedarnathSEO.jsx'));
const RishikeshRaftingSEO = lazy(() => import('./pages/RishikeshRaftingSEO.jsx'));
const HaridwarTaxiSEO = lazy(() => import('./pages/HaridwarTaxiSEO.jsx'));
const AuliSEO = lazy(() => import('./pages/AuliSEO.jsx'));
const ChoptaSEO = lazy(() => import('./pages/ChoptaSEO.jsx'));
const BadrinathSEO = lazy(() => import('./pages/BadrinathSEO.jsx'));
const DoDhamSEO = lazy(() => import('./pages/DoDhamSEO.jsx'));
const RishikeshAdventureSEO = lazy(() => import('./pages/RishikeshAdventureSEO.jsx'));

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center px-4">
    <div className="brand-panel rounded-[28px] px-8 py-6 text-center">
      <div className="text-xs font-bold uppercase tracking-[0.32em] text-brand-blue/70">Yatra Go</div>
      <div className="mt-3 text-2xl font-serif font-bold text-brand-dark">Loading your travel experience</div>
    </div>
  </div>
);

const MainLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col pt-24 lg:pt-32">
      <Navbar />
      <main className="flex-grow overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Suspense fallback={<PageLoader />}>
              {children}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      {location.pathname !== '/dashboard' && <Footer />}
      {location.pathname !== '/dashboard' && <TravelConcierge />}
    </div>
  );
};

const AdminLayout = ({ children }) => (
  <div className="brand-surface min-h-screen font-sans antialiased text-brand-dark">
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <GlobalUiSounds />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about-us" element={<MainLayout><About /></MainLayout>} />
        <Route path="/tour-packages" element={<MainLayout><TourPackages /></MainLayout>} />
        <Route path="/tour/:slug" element={<MainLayout><TourDetails /></MainLayout>} />
        <Route path="/destinations" element={<MainLayout><Destinations /></MainLayout>} />
        <Route path="/destination/:slug" element={<MainLayout><DestinationDetails /></MainLayout>} />
        <Route path="/activity" element={<MainLayout><Activity /></MainLayout>} />
        <Route path="/activity/:id" element={<MainLayout><ActivityDetails /></MainLayout>} />
        <Route path="/services/:type" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
        <Route path="/blog/:id" element={<MainLayout><BlogPost /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/login" element={<MainLayout><ProtectedRoute requireGuest><Login /></ProtectedRoute></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><ProtectedRoute><Dashboard /></ProtectedRoute></MainLayout>} />
        <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
        <Route path="/terms-and-conditions" element={<MainLayout><TermsConditions /></MainLayout>} />
        <Route path="/package/:id" element={<MainLayout><PackageDetails /></MainLayout>} />
        <Route path="/itinerary-builder" element={<MainLayout><ItineraryBuilder /></MainLayout>} />
        <Route path="/itinerary/result" element={<MainLayout><ItineraryResult /></MainLayout>} />

        {/* SEO Landing Page Routes */}
        <Route path="/chardham-yatra-from-haridwar" element={<MainLayout><ChardhamYatraSEO /></MainLayout>} />
        <Route path="/kedarnath-tour-package" element={<MainLayout><KedarnathSEO /></MainLayout>} />
        <Route path="/rishikesh-river-rafting" element={<MainLayout><RishikeshRaftingSEO /></MainLayout>} />
        <Route path="/haridwar-taxi-service" element={<MainLayout><HaridwarTaxiSEO /></MainLayout>} />
        <Route path="/auli-tour-package" element={<MainLayout><AuliSEO /></MainLayout>} />
        <Route path="/chopta-tour-package" element={<MainLayout><ChoptaSEO /></MainLayout>} />
        <Route path="/badrinath-tour-package" element={<MainLayout><BadrinathSEO /></MainLayout>} />
        <Route path="/dodham-yatra" element={<MainLayout><DoDhamSEO /></MainLayout>} />
        <Route path="/rishikesh-adventure-activities" element={<MainLayout><RishikeshAdventureSEO /></MainLayout>} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
