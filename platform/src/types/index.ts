export interface CarImage {
  id?: number | string;
  path?: string;
  url?: string;
  filename?: string;
  name?: string;
  src?: string;
  file?: string;
  main_image?: string;
  title?: string;
}

export interface Addon {
  id?: number;
  title: string;
  price: number;
}

export interface Car {
  id: number | string;
  name?: string;
  model?: string;
  version?: string;
  price?: number;
  images?: string[];
  main_image?: string;
  [key: string]: any;
}

export interface TypeItem {
  id: number | string;
  name?: string;
  [key: string]: any;
}

export interface DriveItem {
  id: number | string;
  name?: string;
  [key: string]: any;
}

export default {};

export interface InformationItem {
  id: number | string;
  title?: string;
  body?: string;
  [key: string]: any;
}

export interface AgreementItem {
  id: number | string;
  title?: string;
  content?: string;
  required?: boolean;
  [key: string]: any;
}

export interface ChatMessage {
  id: number | string;
  message: string;
  sender: 'user' | 'bot' | string;
  created_at?: string;
}

export interface Intent {
  id: number;
  name: string;
  keywords: string[];
  response_template: string;
  requires_data: boolean;
}

export interface VersionData {
  id: number | string;
  name?: string;
  price?: number;
  [key: string]: any;
}

export interface ColorData {
  id: number | string;
  name?: string;
  hex?: string;
  [key: string]: any;
}

export interface CarData {
  id: number | string;
  name?: string;
  type?: string;
  drive?: string;
  range?: number;
  battery_capacity?: number;
  power?: number;
  price?: number;
  versions?: VersionData[];
  colors?: ColorData[];
  [key: string]: any;
}

export interface User {
  id?: number | string;
  name?: string;
  email?: string;
  [key: string]: any;
}
