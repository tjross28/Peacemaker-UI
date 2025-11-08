import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { UploadReport } from './components/UploadReport';
import { ReportView } from './components/ReportView';
import { MedicalDictionary } from './components/MedicalDictionary';
import { ProfileSettings } from './components/ProfileSettings';
import { LearnWithMusic } from './components/LearnWithMusic';

export type Screen = 'login' | 'dashboard' | 'upload' | 'report' | 'dictionary' | 'profile' | 'learn';

export interface Report {
  id: string;
  title: string;
  date: string;
  originalText: string;
  processedTerms: ProcessedTerm[];
}

export interface ProcessedTerm {
  term: string;
  meaning: string;
  whyItMatters: string;
  category: 'measurement' | 'condition' | 'device' | 'medication' | 'alert';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  // Check if user is logged in (from localStorage for offline support)
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedReports = localStorage.getItem('userReports');
    
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
    }
    
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  const handleLogin = (email: string) => {
    setCurrentUser(email);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', email);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('currentUser');
    setCurrentScreen('login');
  };

  const handleReportUpload = (report: Report) => {
    const updatedReports = [...reports, report];
    setReports(updatedReports);
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
    setCurrentScreen('dashboard');
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setCurrentScreen('report');
  };

  const handleDeleteReport = (reportId: string) => {
    const updatedReports = reports.filter(r => r.id !== reportId);
    setReports(updatedReports);
    localStorage.setItem('userReports', JSON.stringify(updatedReports));
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {currentScreen === 'dashboard' && (
        <Dashboard
          reports={reports}
          userName={currentUser}
          onNavigate={setCurrentScreen}
          onViewReport={handleViewReport}
          onDeleteReport={handleDeleteReport}
          onLogout={handleLogout}
        />
      )}
      
      {currentScreen === 'upload' && (
        <UploadReport
          onBack={() => setCurrentScreen('dashboard')}
          onUpload={handleReportUpload}
        />
      )}
      
      {currentScreen === 'report' && selectedReport && (
        <ReportView
          report={selectedReport}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}
      
      {currentScreen === 'dictionary' && (
        <MedicalDictionary
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileSettings
          userName={currentUser}
          onBack={() => setCurrentScreen('dashboard')}
          onLogout={handleLogout}
        />
      )}
      
      {currentScreen === 'learn' && (
        <LearnWithMusic
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}
    </div>
  );
}