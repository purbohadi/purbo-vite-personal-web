import { Contact } from '../types';
import { assets } from './assets';

interface ContactWithFrequency extends Contact {
  frequency: number;
}

export const contactData: ContactWithFrequency[] = [
  {
    id: "contact-001",
    name: "Livia Bator",
    role: "CEO",
    avatar: assets.avatars.livia,
    email: "livia.bator@example.com",
    phone: "+1 555-123-4567",
    frequency: 8
  },
  {
    id: "contact-002",
    name: "Randy Press",
    role: "Director",
    avatar: assets.avatars.randy,
    email: "randy.press@example.com",
    phone: "+1 555-123-4568",
    frequency: 8
  },
  {
    id: "contact-003",
    name: "Workman",
    role: "Designer",
    avatar: assets.avatars.workman,
    email: "workman@example.com",
    phone: "+1 555-123-4569",
    frequency: 8
  },
  {
    id: "contact-004",
    name: "Sarah",
    role: "QA",
    avatar: assets.avatars.sarah,
    email: "sarah@example.com",
    phone: "+1 555-123-4559",
    frequency: 8
  },
  {
    id: "contact-005",
    name: "Tom",
    role: "DevOps",
    avatar: assets.avatars.tom,
    email: "tom@example.com",
    phone: "+1 555-123-4550",
    frequency: 8
  },
  {
    id: "contact-006",
    name: "Amir",
    role: "PM",
    avatar: assets.avatars.amir,
    email: "amir@example.com",
    phone: "+1 555-123-4530",
    frequency: 8
  },
  {
    id: "contact-007",
    name: "Kent",
    role: "CTO",
    avatar: assets.avatars.kent,
    email: "kent@example.com",
    phone: "+1 555-123-4530",
    frequency: 8
  },
];