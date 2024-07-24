export type SnackbarTypeT =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | undefined;

export type ShowSnackbarT = (text: string, type?: SnackbarTypeT) => void;
