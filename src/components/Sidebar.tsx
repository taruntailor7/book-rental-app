'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="bg-gray-50 w-64 h-screen border-r border-gray-200 shadow-md">
      <nav>
        <ul>
          <li className="mb-4 mt-8">
            <Link href="/books" className={`flex items-center p-2 rounded-md ${isActive('/books') ? 'bg-indigo-100' : 'hover:bg-indigo-100'}`}>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Books
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/rental-details" className={`flex items-center p-2 rounded-lg ${isActive('/rental-details') ? 'bg-indigo-100' : 'hover:bg-indigo-100'}`}>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Rental Details
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/consumer-details" className={`flex items-center p-2 rounded-lg ${isActive('/consumer-details') ? 'bg-indigo-100' : 'hover:bg-indigo-100'}`}>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Consumer Details
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;