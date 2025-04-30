type ProgressCounterProps = {
  currentStep: number;
  totalSteps: number;
};

function ProgressCounter({ currentStep, totalSteps }: ProgressCounterProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div>
      {progress}%
    </div>
  );
}

export default ProgressCounter;
