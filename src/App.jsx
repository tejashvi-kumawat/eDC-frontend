import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import Initiatives from './pages/Initiatives';
import Team from './pages/Team';
import Events from './pages/Events';
import Opportunities from './pages/Opportunities';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Calendar from './pages/Calendar';

// // Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import ManageBlogs from './pages/Admin/ManageBlogs';
import ManageTeam from './pages/Admin/ManageTeam';
// import ManageEvents from './pages/Admin/ManageEvents';
// import ManageInitiatives from './pages/Admin/ManageInitiatives';
// import ContactQueries from './pages/Admin/ContactQueries';

// Global Styles
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100,
    });

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/team" element={<Team />} />
              <Route path="/events" element={<Events />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/calendar" element={<Calendar />} />
              
              {/* Admin Routes */}
              {/* <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/blogs" element={<ManageBlogs />} />
              <Route path="/admin/team" element={<ManageTeam />} /> */}
              {/* <Route path="/admin/events" element={<ManageEvents />} />
              <Route path="/admin/initiatives" element={<ManageInitiatives />} />
              <Route path="/admin/queries" element={<ContactQueries />} /> */}
            </Routes>
          </main>
          
          <Footer />
          <ScrollToTop />
        </div>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1c1c1e',
              color: '#ffffff',
              border: '1px solid #2c2c2e',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#32d74b',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff453a',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
