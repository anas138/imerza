import { ObjectId } from 'mongoose';

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface Residence {
  type: string;
  unit: string;
  lot: string;
  floor: string;
  line: string;
  building: string;
  bedrooms: number;
  bathrooms: number;
  den: number;
  sqft_interior: number;
  sqft_exterior: number;
  price: number;
  sales_status: string;
  ue4_map: string;
  floorplan_image: string;
  permission: number;
  stories: string;
  view_image: string;
  view_name: string;
  sales_status_lt: string;
  delivery_type: string;
  purchase_price: number;
}

interface ProjectUser {
  _id: ObjectId;
  scopes: string[];
}

export interface Project {
  name: string;
  logo: string;
  project_root: string;
  screenshots: string;
  settings: { [key: string]: unknown };
  users: ProjectUser[];
}
