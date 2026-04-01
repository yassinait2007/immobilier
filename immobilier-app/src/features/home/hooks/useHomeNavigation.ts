import { useNavigate } from 'react-router-dom';

export const useHomeNavigation = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/categories');
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  const handleExploreProperties = () => {
    navigate('/categories?type=rent-short');
  };

  const handleLearnMore = () => {
    const nextSection = document.getElementById('categories-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryNavigation = (type: string) => {
    navigate(`/categories?type=${type}`);
  };

  return {
    handleGetStarted,
    handleContactUs,
    handleExploreProperties,
    handleLearnMore,
    handleCategoryNavigation
  };
};