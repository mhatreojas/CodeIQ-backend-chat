import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import CodeReview from './pages/CodeReview';
import History from './pages/History';
import { useAuth } from './context/AuthContext';
import './App.css';
import 'prismjs/themes/prism-tomorrow.css';

function HomeRedirect() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="page-center">Loading...</div>;
  return <Navigate to={isAuthenticated ? '/chat' : '/login'} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/review" element={<CodeReview />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
