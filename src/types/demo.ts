/**
 * Types for Demo Dashboard
 */

export interface Company {
  id: string;
  name: string;
  description: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
}

export interface VideoData {
  id: string;
  title: string;
  url: string;
}
