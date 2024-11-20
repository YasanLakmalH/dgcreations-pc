import { useState } from "react";
import { Lightbulb, CircleCheck } from "lucide-react";
export default function TipsCarousel({ currentStepId, title }) {
    // Array of tips
    const tips = {
        1: [
            "Measure at multiple points to account for any variations",
            "Include any trim or molding in your measurements",
            "Double-check all measurements for accuracy",
            "Consider door swing clearance in your depth measurement",
        ],
        2: ["Consider the rooms shape and size",
            "Think about traffic flow and accessibility",
            "Account for door swings and other obstacles",
            "Plan for adequate workspace and storage needs"
        ],
        3: ["Consider your homes existing style",
            "Think about long-term appeal",
            "Balance aesthetics with functionality",
            "Choose finishes that complement your space"
        ],
        4: [
            "Consider your budget and long-term value",
            "Think about maintenance requirements",
            "Factor in durability needs",
            "Match material to your usage patterns"
        ]
    };

    // State to keep track of the current tip index
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    // Function to go to the next tip
    const handleNext = () => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips[currentStepId].length);
    };

    // Function to go to the previous tip
    const handlePrev = () => {
        setCurrentTipIndex(
            (prevIndex) => (prevIndex - 1 + tips[currentStepId].length) % tips[currentStepId].length
        );
    };
    return (
        <div className="p-5 text-start bg-black text-white rounded-3xl shadow-xl my-10 backdrop-blur-md">
            <h4 className="text-lg font-semibold animate-fadeIn flex">
                <Lightbulb size={30} /> Tips
            </h4>

            <div className="md:flex h-full">
                <p className="text-white sm:h-3/4">
                    {currentStepId < 5 ? tips[currentStepId][currentTipIndex] : ''}
                </p>
                <div className="flex justify-between sm:h-1/4 lg:space-x-2">
                <button
                    onClick={handlePrev}
                    className="rounded-full"
                >
                    {"<"}
                </button>
                <button
                    onClick={handleNext}
                    className="rounded-full"
                >
                    {">"}
                </button>
                </div>
                
            </div>
        </div>


    );
}
