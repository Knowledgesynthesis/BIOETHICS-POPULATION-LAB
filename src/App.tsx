import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { useAppStore } from './store/useAppStore';

// Pages
import Home from './pages/Home';
import StatsLab from './pages/stats/StatsLab';
import StudyDesign from './pages/study-design/StudyDesign';
import Ethics from './pages/ethics/Ethics';
import Safety from './pages/safety/Safety';
import HIPAA from './pages/hipaa/HIPAA';
import PublicHealth from './pages/public-health/PublicHealth';
import Cases from './pages/cases/Cases';
import Assessment from './pages/assessment/Assessment';
import Glossary from './pages/glossary/Glossary';
import Settings from './pages/settings/Settings';

function App() {
  const setOfflineStatus = useAppStore((state) => state.setOfflineStatus);

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setOfflineStatus(false);
    const handleOffline = () => setOfflineStatus(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial status
    setOfflineStatus(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOfflineStatus]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<StatsLab />} />
        <Route path="/study-design" element={<StudyDesign />} />
        <Route path="/ethics" element={<Ethics />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/hipaa" element={<HIPAA />} />
        <Route path="/public-health" element={<PublicHealth />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
