import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { MusicPage } from './pages/MusicPage';
import { UserPage } from './pages/UserPage';

// Placeholder for Activity Page
const ActivityPage = () => <div className="p-4 text-center text-gray-500">活动页面正在开发中...</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="music" element={<MusicPage />} />
          <Route path="profile" element={<UserPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
