import Searchbar from '@/components/Searchbar';
import { Control, Controller } from 'react-hook-form';

export interface SearchbarForm {
  readonly query: string;
}

interface LibraryHeaderProps {
  readonly control: Control<SearchbarForm>;
  handleOpenFilter(): void;
}

export function LibraryHeader({
  control,
  handleOpenFilter,
}: LibraryHeaderProps) {
  return (
    <Controller
      control={control}
      name="query"
      render={({ field: { ref, ...rest } }) => (
        <Searchbar handleOpenFilter={handleOpenFilter} {...rest} />
      )}
    />
  );
}
