"use client";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const currentTheme = storedTheme || (prefersDark ? "dark" : "light");

        setTheme(currentTheme);
        document.documentElement.classList.toggle("dark", currentTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="text-black dark:text-white cursor-pointer transition"
        >
            {theme === "light" ? <CiLight size={25} /> : <CiDark size={25} />}
        </button>
    );
};

export default ThemeToggle;
