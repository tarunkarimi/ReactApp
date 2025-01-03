import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { useStore } from '../../store/useStore';
import type { Communication } from '../../types';

export function CalendarView() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { communications, companies, communicationMethods } = useStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getCommunicationsForDay = (date: Date): Communication[] => {
    return communications.filter(
      (comm) => isSameDay(new Date(comm.date), date)
    );
  };

  const getCompanyName = (id: string) => {
    return companies.find((c) => c.id === id)?.name ?? '';
  };

  const getMethodName = (id: string) => {
    return communicationMethods.find((m) => m.id === id)?.name ?? '';
  };

  const getDayClassName = (day: Date, communications: Communication[]) => {
    let className = 'min-h-[100px] bg-white p-2 ';
    
    if (isToday(day)) {
      className += 'bg-yellow-100 ';
    } else if (communications.length > 0) {
      className += 'bg-blue-50 ';
    }
    
    return className;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
            }
            className="p-2 hover:bg-gray-100 rounded"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
            }
            className="p-2 hover:bg-gray-100 rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayComms = getCommunicationsForDay(day);
          return (
            <div
              key={day.toString()}
              className={getDayClassName(day, dayComms)}
            >
              <div className={`font-medium text-sm ${isToday(day) ? 'text-blue-700' : ''}`}>
                {format(day, 'd')}
              </div>
              <div className="mt-1 space-y-1">
                {dayComms.map((comm) => (
                  <div
                    key={comm.id}
                    className="text-xs p-1 bg-white rounded shadow"
                    title={comm.notes}
                  >
                    <div className="font-medium">{getCompanyName(comm.companyId)}</div>
                    <div className="text-gray-500">{getMethodName(comm.methodId)}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}