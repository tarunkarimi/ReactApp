import React from 'react';
import { useStore } from '../../store/useStore';
import type { Company } from '../../types';

export function CompanyForm({ company, onClose }: { company?: Company; onClose: () => void }) {
  const { addCompany, updateCompany } = useStore();
  const [formData, setFormData] = React.useState<Partial<Company>>(
    company ?? {
      name: '',
      location: '',
      linkedinProfile: '',
      emails: [''],
      phoneNumbers: [''],
      comments: '',
      communicationPeriodicity: 14,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) {
      updateCompany({ ...company, ...formData as Company });
    } else {
      addCompany({
        ...formData as Company,
        id: crypto.randomUUID(),
      });
    }
    onClose();
  };

  const handleArrayInput = (
    field: 'emails' | 'phoneNumbers',
    index: number,
    value: string
  ) => {
    const newArray = [...(formData[field] ?? [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field: 'emails' | 'phoneNumbers') => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] ?? []), ''],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
        <input
          type="url"
          required
          value={formData.linkedinProfile}
          onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Emails</label>
        {formData.emails?.map((email, index) => (
          <input
            key={index}
            type="email"
            required
            value={email}
            onChange={(e) => handleArrayInput('emails', index, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        ))}
        <button
          type="button"
          onClick={() => addArrayField('emails')}
          className="mt-2 text-sm text-blue-500"
        >
          + Add Email
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
        {formData.phoneNumbers?.map((phone, index) => (
          <input
            key={index}
            type="tel"
            required
            value={phone}
            onChange={(e) => handleArrayInput('phoneNumbers', index, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        ))}
        <button
          type="button"
          onClick={() => addArrayField('phoneNumbers')}
          className="mt-2 text-sm text-blue-500"
        >
          + Add Phone Number
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Communication Periodicity (days)
        </label>
        <input
          type="number"
          required
          min="1"
          value={formData.communicationPeriodicity}
          onChange={(e) =>
            setFormData({
              ...formData,
              communicationPeriodicity: parseInt(e.target.value),
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {company ? 'Update' : 'Add'} Company
        </button>
      </div>
    </form>
  );
}