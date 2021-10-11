export type Service = 'Wi-Fi' | 'Accessibility' | 'Power Supply' | 'PC';

export type Seat = {
  id: number;
  services: readonly Service[];
};

export type SparseMatrix<T> = readonly (T | undefined)[][];
