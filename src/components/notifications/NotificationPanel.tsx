import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../../store/useStore';
import { Bell } from 'lucide-react';

export function NotificationPanel() {
  const { companies, getNextScheduledCommunication } = useStore();

  const getOverdueCommunications = () => {
    return companies
      .map((company) => ({
        company,
        nextDate: getNextScheduledCommunication(company.id),
      }))
      .filter(
        ({ nextDate }) => nextDate && nextDate < new Date()
      );
  };

  const getTodaysCommunications = () => {
    const today = new Date();
    return companies
      .map((company) => ({
        company,
        nextDate: getNextScheduledCommunication(company.id),
      }))
      .filter(
        ({ nextDate }) =>
          nextDate &&
          nextDate.getDate() === today.getDate() &&
          nextDate.getMonth() === today.getMonth() &&
          nextDate.getFullYear() === today.getFullYear()
      );
  };

  const overdue = getOverdueCommunications();
  const today = getTodaysCommunications();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>

      {overdue.length > 0 && (
        <div className="mb-6">
          <h3 className="text-red-600 font-medium mb-2">Overdue Communications</h3>
          <div className="space-y-2">
            {overdue.map(({ company, nextDate }) => (
              <div
                key={company.id}
                className="p-2 bg-red-50 rounded border border-red-100"
              >
                <div className="font-medium">{company.name}</div>
                <div className="text-sm text-red-600">
                  Due: {nextDate && format(nextDate, 'MMM d, yyyy')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {today.length > 0 && (
        <div>
          <h3 className="text-yellow-600 font-medium mb-2">Due Today</h3>
          <div className="space-y-2">
            {today.map(({ company, nextDate }) => (
              <div
                key={company.id}
                className="p-2 bg-yellow-50 rounded border border-yellow-100"
              >
                <div className="font-medium">{company.name}</div>
                <div className="text-sm text-yellow-600">
                  Due: {nextDate && format(nextDate, 'MMM d, yyyy')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {overdue.length === 0 && today.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No pending notifications
        </div>
      )}
    </div>
  );
}