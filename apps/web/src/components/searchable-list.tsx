import { Plus } from 'lucide-react';
import { Button } from './button';
import { SearchBar } from './searchbar';

export type SearchableListProps = React.PropsWithChildren & {
  onSearch: (value: string) => void;
  onAddNew: () => void;
  searchPlaceholder?: string;
  searchDisabled?: boolean;
};

export function SearchableList({
  children,
  onSearch,
  onAddNew,
  searchPlaceholder,
  searchDisabled,
}: SearchableListProps) {
  return (
    <div className='flex-col gap-2 animate-app-screen p-2 overflow-hidden'>
      <div className='w-full gap-2'>
        <SearchBar
          disabled={searchDisabled}
          placeholder={searchPlaceholder}
          onChange={e => onSearch(e.target.value)}
        />
        <Button
          variant='outlined'
          onClick={onAddNew}>
          <Plus />
        </Button>
      </div>
      <div className='flex-col gap-1 overflow-y-scroll h-full'>{children}</div>
    </div>
  );
}
