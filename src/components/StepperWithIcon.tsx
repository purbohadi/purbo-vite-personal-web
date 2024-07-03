import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import PT from "../assets/flags/PT.png"
import FR from "../assets/flags/FR.png"
import CN from "../assets/flags/CN.png"
import questionMark from "../assets/flags/questionMark.png"
 
export default function StepperWithIcon({ activeStep, setActiveStep }) {
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
 
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
 
  return (
    <div className="w-full">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <img src={PT} className="w-5 h-5" />
        </Step>
        <Step onClick={() => setActiveStep(0)}>
          <img src={FR} className="w-5 h-5" />
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <img src={CN} className="w-5 h-5" />
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <img src={PT} className="w-5 h-5" />
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <img src={questionMark} className="w-5 h-5" />
        </Step>
      </Stepper>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}