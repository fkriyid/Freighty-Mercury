import { Home, BookOpen, TrendingUp, Calculator, Users, HelpCircle, Ship, LogOut, Moon, Sun } from 'lucide-react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const navigation = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'incoterms', label: 'Incoterms', icon: BookOpen },
  { id: 'exchange', label: 'Exchange', icon: TrendingUp },
  { id: 'calculator', label: 'Calculator', icon: Calculator },
  { id: 'vendors', label: 'Vendors', icon: Users },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export function Sidebar({ currentPage, onNavigate, onLogout, isDarkMode, onToggleDarkMode }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#0f172a] dark:bg-gray-950 text-white flex flex-col border-r border-gray-700 dark:border-gray-800">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Ship className="h-6 w-6" />
          </div>
          <div>
            <h2 className="tracking-tight">FREIGHTY</h2>
            <h2 className="tracking-tight">MERCURY</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                currentPage === item.id
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Dark Mode Toggle & Logout */}
      <div className="p-4 space-y-3 border-t border-gray-700 dark:border-gray-800">
        <button
          onClick={onToggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-white transition-colors"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span>FW</span>
          </div>
          <div>
            <p className="text-sm">Farhan Wijaya</p>
            <p className="text-xs text-gray-400">Pricing Specialist</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
