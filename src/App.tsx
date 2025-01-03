import React from 'react';
import { Dashboard } from './components/Dashboard';
import { CalendarView } from './components/calendar/CalendarView';
import { NotificationPanel } from './components/notifications/NotificationPanel';
import { AdminPanel } from './components/admin/AdminPanel';
import { useStore } from './store/useStore';
import { Calendar, Bell, Settings } from 'lucide-react';

function App() {
  const [view, setView] = React.useState<'dashboard' | 'calendar'>('dashboard');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showAdminPanel, setShowAdminPanel] = React.useState(false);
  
  const { companies } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">Communication Calendar</h1>
              </div>
              <div className="ml-6 flex space-x-4">
                <button
                  onClick={() => setView('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    view === 'dashboard'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    view === 'calendar'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAdminPanel(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                <Settings className="h-5 w-5" />
                Admin
              </button>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                <Bell className="h-5 w-5" />
                {showNotifications ? 'Hide' : 'Show'} Notifications
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <div className="flex-1">
            {view === 'dashboard' ? <Dashboard /> : <CalendarView />}
          </div>
          {showNotifications && (
            <div className="w-96">
              <NotificationPanel />
            </div>
          )}
        </div>
      </main>

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}

export default App;