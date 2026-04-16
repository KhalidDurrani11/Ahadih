export type Page = 'home' | 'departments' | 'specialists' | 'about' | 'contact' | 'appointment';

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialization: string;
  qualifications: string;
  experience: number;
  image: string;
  bio: string;
  achievements: string[];
}

export interface Department {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}
