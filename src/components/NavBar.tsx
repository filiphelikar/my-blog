'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-zinc-950 dark:text-white p-4 fixed w-full top-0 left-0 z-50 shadow-xs dark:shadow-gray-400 transition">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">{"< Blog / >"}</Link>

                <button
                    className="md:hidden block text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className='text-black dark:text-white' size={28} /> : <Menu className='text-black dark:text-white' size={28} />}
                </button>

                <ul className="hidden md:flex space-x-6">
                    <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
                    <li><Link href="/about" className="hover:text-gray-400">About</Link></li>
                    <li><Link href="/create" className="hover:text-gray-400">Create</Link></li>
                    <ThemeToggle />
                </ul>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-none md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isOpen ? 0 : "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-slate-950 shadow-lg md:hidden flex flex-col items-center pt-20 space-y-4 z-50"
            >
                <button
                    className="absolute top-4 right-4 text-white"
                    onClick={() => setIsOpen(false)}
                >
                    <X className='text-black dark:text-white' size={28} />
                </button>
                <Link onClick={() => setIsOpen(false)} href="/" className="block py-2">Home</Link>
                <Link onClick={() => setIsOpen(false)} href="/about" className="block py-2">About</Link>
                <Link onClick={() => setIsOpen(false)} href="/create" className="block py-2">Create</Link>
                <ThemeToggle />
            </motion.div>
        </nav>
    );
};

export default NavBar;