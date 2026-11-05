import axios from 'axios';
import type {
  Employee,
  EmployeeFormData,
  PaginatedResponse,
  DashboardStats,
} from '../types/employee';

// Default to '/api' which works natively with the Nginx reverse proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export interface EmployeeQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  search?: string;
  department?: string;
}

export const employeeService = {
  // Fetch paginated employees with search, filter, and sorting
  getEmployees: async (params: EmployeeQueryParams): Promise<PaginatedResponse<Employee>> => {
    const response = await apiClient.get<PaginatedResponse<Employee>>('/employees', {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 10,
        sortBy: params.sortBy ?? 'id',
        sortDir: params.sortDir ?? 'asc',
        search: params.search || undefined,
        department: params.department || undefined,
      },
    });
    return response.data;
  },

  // Get employee by ID
  getEmployeeById: async (id: number): Promise<Employee> => {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  // Create new employee
  createEmployee: async (data: EmployeeFormData): Promise<Employee> => {
    const payload = {
      ...data,
      salary: Number(data.salary),
    };
    const response = await apiClient.post<Employee>('/employees', payload);
    return response.data;
  },

  // Update existing employee
  updateEmployee: async (id: number, data: EmployeeFormData): Promise<Employee> => {
    const payload = {
      ...data,
      salary: Number(data.salary),
    };
    const response = await apiClient.put<Employee>(`/employees/${id}`, payload);
    return response.data;
  },

  // Delete employee
  deleteEmployee: async (id: number): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },

  // Get dashboard statistics
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/employees/stats');
    return response.data;
  },

  // Get list of distinct departments
  getDepartments: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/employees/departments');
    return response.data;
  },
};

export default apiClient;
