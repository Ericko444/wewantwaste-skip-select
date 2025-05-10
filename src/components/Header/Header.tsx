import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faMapMarkerAlt,
    faDumpster,
    faTruckPickup,
    faShieldAlt,
    faCalendarAlt,
    faCreditCard,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

interface NavItemProps {
    icon: IconDefinition;
    label: string;
    isActive?: boolean;
    isCompleted?: boolean;
    isLast?: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, isCompleted, isLast, onClick }) => {
    let textColor = 'text-gray-500';
    let fontWeight = 'font-medium';
    let iconColor = 'text-gray-400';
    let underlineClasses = '';

    if (isActive) {
        textColor = 'text-blue-600';
        fontWeight = 'font-bold';
        iconColor = 'text-blue-600';
        underlineClasses = 'border-b-2 border-blue-600';
    } else if (isCompleted) {
        textColor = 'text-blue-600';
        iconColor = 'text-blue-600';
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center group focus:outline-none text-left ${isActive || isCompleted ? 'opacity-100' : 'opacity-75 hover:opacity-100 transition-opacity'}`}
            disabled={!isActive && !isCompleted}
        >
            <span className={`hidden sm:inline-block mr-1.5 sm:mr-2 ${iconColor} group-hover:text-blue-500 transition-colors`}>
                <FontAwesomeIcon icon={icon} />
            </span>
            <span className={`${textColor} ${fontWeight} ${underlineClasses} pb-1 group-hover:text-blue-500 transition-colors`}>
                {label}
            </span>
            {!isLast && (
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-gray-300 mx-1.5 sm:mx-3 text-xs"
                />
            )}
        </button>
    );
};

const Header: React.FC = () => {
    const currentStepId = "Select Skip";

    const steps = [
        { id: "Postcode", icon: faMapMarkerAlt, label: "Postcode" },
        { id: "Waste Type", icon: faDumpster, label: "Waste Type" },
        { id: "Select Skip", icon: faTruckPickup, label: "Select Skip" },
        { id: "Permit Check", icon: faShieldAlt, label: "Permit Check" },
        { id: "Choose Date", icon: faCalendarAlt, label: "Choose Date" },
        { id: "Payment", icon: faCreditCard, label: "Payment" },
    ];

    const handleStepClick = (stepId: string) => {
        console.log(`Step clicked: ${stepId}`);
    };

    let hasReachedActiveStep = false;

    return (
        <header className="pt-6 pb-8 sm:pb-12">
            <div className="container mx-auto px-4">
                <nav className="flex flex-wrap justify-center items-center gap-x-1.5 gap-y-2 sm:gap-x-2.5 text-xs sm:text-sm mb-8 md:mb-10">
                    {steps.map((step, index) => {
                        const isActive = step.id === currentStepId;
                        const isCompleted = !hasReachedActiveStep && !isActive;

                        if (isActive) {
                            hasReachedActiveStep = true;
                        }

                        return (
                            <NavItem
                                key={step.id}
                                icon={step.icon}
                                label={step.label}
                                isActive={isActive}
                                isCompleted={isCompleted}
                                isLast={index === steps.length - 1}
                                onClick={() => handleStepClick(step.id)}
                            />
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};

export default Header;