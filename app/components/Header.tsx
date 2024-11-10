'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
  { name: '奨学金リスト', href: '/scholarship' },
  { name: '自分に合った奨学金を探す', href: '#' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  return (
    <nav className="bg-white shadow-md">
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
                onClick={e => {
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
              <Button
                className="ml-2 bg-[#7CB7B7] hover:bg-[#7CB7B7]/90 text-white"
              >
                会員登録
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
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

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={e => {
                  if (item.name === '自分に合った奨学金を探す') {
                    e.preventDefault(); // デフォルトのページ遷移を阻止
                    fetchScholarships();
                  }
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
            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                className="w-full border-[#7CB7B7] text-black hover:bg-[#7CB7B7]/10"
                onClick={() => {
                  handleUserSession();
                  setIsMobileMenuOpen(false);
                }}
              >
                {session ? 'ログアウト' : 'ログイン'}
              </Button>
              {!session && (
                <Button
                  className="w-full bg-[#7CB7B7] hover:bg-[#7CB7B7]/90 text-white"
                >
                  会員登録
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
