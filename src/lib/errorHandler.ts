
export type SupabaseError = {
  code: string;
  message: string;
  details?: string;
  timestamp: number;
};

export function handleSupabaseError(error: any): SupabaseError {
  // Comprehensive error parsing
  if (error instanceof Error) {
    return {
      code: 'RUNTIME_ERROR',
      message: error.message,
      details: error.stack,
      timestamp: Date.now()
    };
  }

  // Supabase specific error structure
  if (error && typeof error === 'object') {
    return {
      code: error.code || 'UNKNOWN_SUPABASE_ERROR',
      message: error.message || 'Supabase operation failed',
      details: JSON.stringify(error),
      timestamp: Date.now()
    };
  }

  // Fallback for unexpected error types
  return {
    code: 'UNEXPECTED_ERROR',
    message: String(error || 'Unknown error occurred'),
    timestamp: Date.now()
  };
}
