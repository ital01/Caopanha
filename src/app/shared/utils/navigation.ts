import { useNavigate } from 'react-router-dom';

export default function Navigate(path: string) {
  const navigate = useNavigate();
  return () => navigate(path);
}
