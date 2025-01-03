import React from 'react';
import { CompanyForm } from './CompanyForm';
import { CommunicationMethodForm } from './CommunicationMethodForm';
import { X } from 'lucide-react';

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = React.useState<'companies' | 'methods'>('companies');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'companies'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Manage Companies
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'methods'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Communication Methods
          </button>
        </div>

        {activeTab === 'companies' ? (
          <CompanyForm onClose={() => {}} />
        ) : (
          <CommunicationMethodForm onClose={() => {}} />
        )}
      </div>
    </div>
  );
}