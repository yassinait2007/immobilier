export interface ApiResponsePagination<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: T[];
    pagination: Pagination;
  };
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}
