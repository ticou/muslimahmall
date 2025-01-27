import { Token } from "@/services/apiClient";

export interface ResponseAPI<T> {
  message: string;
  status: number;
  success: boolean;
  data?: T[];
  meta?: MetaData;
  state?: StateResponse;
}

export interface ResponseSimpleAPI<T> {
  message: string;
  status: number;
  success: boolean;
  data?: T;
  meta?: MetaData;
  state?: StateResponse;
}

export interface ResponseAuthAPI {
  message: string;
  status: number;
  success: boolean;
  data: Token;
  meta: MetaData;
  state: StateResponse;
}

interface MetaData {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}
interface StateResponse {
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}
