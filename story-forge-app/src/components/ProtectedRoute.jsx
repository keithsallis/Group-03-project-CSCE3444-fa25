import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authCore.jsx';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
}