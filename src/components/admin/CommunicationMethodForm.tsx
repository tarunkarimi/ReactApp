import React from 'react';
import { useStore } from '../../store/useStore';
import type { CommunicationMethod } from '../../types';

export function CommunicationMethodForm({
  method,
  onClose,
}: {
  method?: CommunicationMethod;
  onClose: () => void;
}) {
  const { addCommunicationMethod, updateCommunicationMethod } = useStore();
  const [formData, setFormData] = React.useState<Partial<CommunicationMethod>>(
    method ?? {
      name: '',
      description: '',
      sequence: 1,
      isMandatory: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method) {
      updateCommunicationMethod({ ...method, ...formData as CommunicationMethod });
    } else {
      addCommunicationMethod({
        ...formData as CommunicationMethod,
        id: crypto.randomUUID(),
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Method Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sequence</label>
        <input
          type="number"
          required
          min="1"
          value={formData.sequence}
          onChange={(e) =>
            setFormData({ ...formData, sequence: parseInt(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isMandatory"
          checked={formData.isMandatory}
          onChange={(e) =>
            setFormData({ ...formData, isMandatory: e.target.checked })
          }
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isMandatory" className="ml-2 block text-sm text-gray-700">
          Mandatory in sequence
        </label>
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
          {method ? 'Update' : 'Add'} Method
        </button>
      </div>
    </form>
  );
}