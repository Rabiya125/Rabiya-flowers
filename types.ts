export interface Flower {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
