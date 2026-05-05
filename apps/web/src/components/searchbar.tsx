import { Search, SearchX } from 'lucide-react';
import { Input, type InputProps } from './input';

export type SearchBarProps = Pick<InputProps, 'placeholder' | 'onChange' | 'disabled'>;
export function SearchBar(props: SearchBarProps) {
  return (
    <Input
      {...props}
      type='search'
      icon={props.disabled ? <SearchX /> : <Search />}
    />
  );
}
