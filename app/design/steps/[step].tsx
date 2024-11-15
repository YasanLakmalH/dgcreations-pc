// pages/steps/[step].tsx

import { useRouter } from 'next/router';

const StepPage = () => {
  const router = useRouter();
  const { step } = router.query;

  const renderComponent = () => {
    switch (step) {
      case 'measurements':
        return "hello";
     
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div>
      <h1>Step: {step}</h1>
      {renderComponent()}
    </div>
  );
};

export default StepPage;
