import React from 'react';
import { Button } from "@/components/ui/button";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import useDarkMode from './useDarkMode';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Button onClick={toggleDarkMode} variant="outline">
            {isDarkMode ? (
                <MdLightMode className="text-yellow-500" />
            ) : (
                <MdDarkMode className="text-gray-800" />
            )}
        </Button>
    );
}

export default DarkModeToggle;
