'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const navItems = [
  { name: 'ホーム', href: '/' },
  { name: '問い合わせ', href: '/contact' },
  { name: '奨学金リスト', href: '/scholarship' },
  { name: '自分に合った奨学金を探す', href: '#' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  async function fetchScholarships() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/database/user`, { method: 'POST' }); 
      const data = await response.json();
      if (data.redirect) {
        router.push(data.redirect);
      }
    } catch (error) {
      console.error('APIを取得中にエラーが発生しました:', error);
    }
  }

  const handleUserSession = () => {
    if (!session) {
      router.push('/api/auth/signin');
    } else {
      router.push('/api/auth/signout');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-black">
              スコラー
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.name === '自分に合った奨学金を探す') {
                    e.preventDefault();
                    fetchScholarships();
                  }
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-black hover:bg-gray-100 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="outline"
              className="ml-4 border-[#7CB7B7] text-black hover:bg-[#7CB7B7]/10"
              onClick={handleUserSession}
            >
              {session ? 'ログアウト' : 'ログイン'}
            </Button>
            {!session && (
              <Button className="ml-2 bg-[#7CB7B7] hover:bg-[#7CB7B7]/90 text-white">
                会員登録
              </Button>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-0 h-auto max-h-[80vh] bg-white/90 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.name === '自分に合った奨学金を探す') {
                    e.preventDefault();
                    fetchScholarships();
                  }
                  toggleMobileMenu();
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-black hover:bg-gray-100 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-4 pb-6 space-y-2">
            <Button
              variant="outline"
              className="w-full border-[#7CB7B7] text-black hover:bg-[#7CB7B7]/10"
              onClick={() => {
                handleUserSession();
                toggleMobileMenu();
              }}
            >
              {session ? 'ログアウト' : 'ログイン'}
            </Button>
            {!session && (
              <Button
                className="w-full bg-[#7CB7B7] hover:bg-[#7CB7B7]/90 text-white"
                onClick={toggleMobileMenu}
              >
                会員登録
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}