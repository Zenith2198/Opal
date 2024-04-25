"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import TabButton from './TabButton';

interface Option {
  tabName: string;
  route: string;
}

interface DropdownTabButtonProps {
  name: string;
  options: Option[];
}

export default function DropdownTabButton({ name, options }: DropdownTabButtonProps) {
  const pathname = usePathname();
  const isActive = (route: string) => pathname === route;

  return (
    <div className="relative group">
      <button
        className={`px-4 py-2 font-semibold rounded-md focus:outline-none transition-colors duration-200 flex items-center ${
          options.some(option => isActive(option.route)) ? 'text-white' : 'text-gray-500 hover:text-white'
        }`}
      >
        {name}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <ul className="absolute left-0 hidden group-hover:block mt-0 py-2 w-48 bg-secondary rounded-md shadow-lg z-10">
        {options.map((option) => (
          <li key={option.route} className={`px-4 py-2 ${
            isActive(option.route) ? 'text-white' : 'text-gray-500 hover:text-white'
          }`}>
            <TabButton tabName={option.tabName} route={option.route} />
          </li>
        ))}
      </ul>
    </div>
  );
}