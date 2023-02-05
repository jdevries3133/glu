export const LoadingSpinner = () => (
  <span className="flex items-center justify-center">
    <span
      className="spinner-border inline-block h-8 w-8 animate-spin rounded-full
      border-4"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </span>
  </span>
);

export const InlineSpinner = () => (
  <span className="inline">
    <span
      className="spinner-border inline-block h-4 w-4 animate-spin rounded-full
      border-4"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </span>
  </span>
);
