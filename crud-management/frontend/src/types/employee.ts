export interface Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeFormData {
  employeeCode?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  salary: number | '';
  joiningDate: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface DashboardStats {
  totalEmployees: number;
  averageSalary: number;
  totalDepartments: number;
  departmentBreakdown: Record<string, number>;
  newJoinersLast30Days: number;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  department?: string;
  designation?: string;
  salary?: string;
  joiningDate?: string;
}
