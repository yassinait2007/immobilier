import BecomeHostForm from './components/BecomeHostForm';
import { useAuth } from '@/context/authentication/auth-context';
import { useNavigate } from 'react-router-dom';
import { BecomeHostSuccess } from './components/BecomeHostSuccess';

const BecomeHostPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user?.identityStatus === 'pending') {
    return <BecomeHostSuccess />;
  }

  return <BecomeHostForm />;
};

export default BecomeHostPage;
