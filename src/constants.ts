import { Department, Doctor } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    title: 'Cardiology',
    description: 'World-class heart care with advanced diagnostic and surgical capabilities for cardiac health.',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'neurology',
    title: 'Neurology',
    description: 'Expert care for complex neurological conditions using the latest in neuroimaging and treatment.',
    icon: 'Brain',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'orthopedics',
    title: 'Orthopedics',
    description: 'Advanced treatments for bone, joint, and muscle health, from sports injuries to joint replacement.',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pediatrics',
    title: 'Pediatrics',
    description: 'Compassionate healthcare for infants, children, and adolescents in a kid-friendly environment.',
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1581594632702-f2013e91342e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'radiology',
    title: 'Radiology',
    description: 'Cutting-edge imaging technology for precise diagnosis and minimally invasive procedures.',
    icon: 'Scan',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'emergency',
    title: 'Emergency Medicine',
    description: '24/7 rapid response for life-threatening conditions with a highly skilled trauma team.',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1587351058047-649abc67d558?auto=format&fit=crop&q=80&w=800'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Khalidi',
    role: 'Chief Surgeon - Cardiology',
    specialization: 'Cardiovascular Surgery',
    qualifications: 'MD, FACS, FACC',
    experience: 18,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?auto=format&fit=crop&q=80&w=800',
    bio: 'Dr. Khalidi is a world-renowned cardiovascular surgeon with over 2,000 successful surgeries. She specializes in minimally invasive heart procedures.',
    achievements: ['Best Surgeon Award 2022', 'Expert in AI-Robotic Surgery']
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    role: 'Head of Neurology',
    specialization: 'Neurological Disorders',
    qualifications: 'MD, PhD (Harvard)',
    experience: 22,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    bio: 'Dr. Wilson leads our neurology research center, focusing on degenerative brain diseases and advanced neuro-restoration.',
    achievements: ['Pioneer in Neuro-Mapping', 'Published 50+ Research Papers']
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    role: 'Senior Pediatrician',
    specialization: 'Pediatric Oncology',
    qualifications: 'MD, M.Sc',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1594824812377-ade8f3dfc299?auto=format&fit=crop&q=80&w=800',
    bio: 'Dr. Rodriguez is dedicated to providing high-quality care to children with complex medical needs, combining clinical excellence with empathy.',
    achievements: ['Child Advocacy Winner 2021', 'Community Service Excellence']
  }
];
