import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/Table';
import { useStore } from '../store/useStore';
import { CommunicationForm } from './communication/CommunicationForm';

export function Dashboard() {
  const { companies, getLastFiveCommunications, getNextScheduledCommunication, communicationMethods } = useStore();
  const [showCommunicationForm, setShowCommunicationForm] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState<string | null>(null);

  const isOverdue = (date: Date) => {
    return date < new Date();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getMethodName = (methodId: string) => {
    return communicationMethods.find(m => m.id === methodId)?.name ?? '';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Communication Dashboard</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Last Five Communications</TableHead>
            <TableHead>Next Scheduled</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => {
            const nextCommunication = getNextScheduledCommunication(company.id);
            const lastComms = getLastFiveCommunications(company.id);
            const rowClass = nextCommunication
              ? isOverdue(nextCommunication)
                ? 'bg-red-50'
                : isToday(nextCommunication)
                ? 'bg-yellow-50'
                : ''
              : '';

            return (
              <TableRow key={company.id} className={rowClass}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {lastComms.map((comm) => (
                      <div
                        key={comm.id}
                        className="text-sm bg-gray-100 px-2 py-1 rounded"
                        title={comm.notes}
                      >
                        <div>{format(comm.date, 'MMM d')}</div>
                        <div className="text-xs text-gray-600">{getMethodName(comm.methodId)}</div>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {nextCommunication && format(nextCommunication, 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setSelectedCompany(company.id);
                      setShowCommunicationForm(true);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Log Communication
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {showCommunicationForm && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <CommunicationForm
              companies={companies}
              initialCompanyId={selectedCompany}
              onClose={() => {
                setShowCommunicationForm(false);
                setSelectedCompany(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}