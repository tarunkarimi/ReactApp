import { create } from 'zustand';
import { Company, Communication, CommunicationMethod } from '../types';

interface State {
  companies: Company[];
  communications: Communication[];
  communicationMethods: CommunicationMethod[];
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  addCommunication: (communication: Communication) => void;
  addCommunicationMethod: (method: CommunicationMethod) => void;
  updateCommunicationMethod: (method: CommunicationMethod) => void;
  deleteCommunicationMethod: (id: string) => void;
  getLastFiveCommunications: (companyId: string) => Communication[];
  getNextScheduledCommunication: (companyId: string) => Date | null;
}

const defaultCommunicationMethods: CommunicationMethod[] = [
  { id: '1', name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, isMandatory: true },
  { id: '2', name: 'LinkedIn Message', description: 'Direct message on LinkedIn', sequence: 2, isMandatory: true },
  { id: '3', name: 'Email', description: 'Email communication', sequence: 3, isMandatory: true },
  { id: '4', name: 'Phone Call', description: 'Phone call communication', sequence: 4, isMandatory: true },
  { id: '5', name: 'Other', description: 'Other forms of communication', sequence: 5, isMandatory: false },
];

export const useStore = create<State>((set, get) => ({
  companies: [],
  communications: [],
  communicationMethods: defaultCommunicationMethods,

  addCompany: (company) => set((state) => ({
    companies: [...state.companies, company],
  })),

  updateCompany: (company) => set((state) => ({
    companies: state.companies.map((c) => (c.id === company.id ? company : c)),
  })),

  deleteCompany: (id) => set((state) => ({
    companies: state.companies.filter((c) => c.id !== id),
  })),

  addCommunication: (communication) => set((state) => ({
    communications: [...state.communications, communication],
  })),

  addCommunicationMethod: (method) => set((state) => ({
    communicationMethods: [...state.communicationMethods, method],
  })),

  updateCommunicationMethod: (method) => set((state) => ({
    communicationMethods: state.communicationMethods.map((m) =>
      m.id === method.id ? method : m
    ),
  })),

  deleteCommunicationMethod: (id) => set((state) => ({
    communicationMethods: state.communicationMethods.filter((m) => m.id !== id),
  })),

  getLastFiveCommunications: (companyId) => {
    const { communications } = get();
    return communications
      .filter((c) => c.companyId === companyId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  },

  getNextScheduledCommunication: (companyId) => {
    const { companies, communications } = get();
    const company = companies.find((c) => c.id === companyId);
    if (!company) return null;

    const lastCommunication = communications
      .filter((c) => c.companyId === companyId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

    if (!lastCommunication) {
      return new Date();
    }

    const nextDate = new Date(lastCommunication.date);
    nextDate.setDate(nextDate.getDate() + company.communicationPeriodicity);
    return nextDate;
  },
}));