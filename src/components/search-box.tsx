import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { UserSearchList } from './user-list';
import { RootState } from '@/states/store';
import { isSearching, searchUsers } from '@/states/slices/uiSlice';

interface SearchBoxProps {
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ className }) => {
  const onSearching = useSelector((state: RootState) => state.ui.searching);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleDebouncedChange = debounce((value: string) => {
    setSearchValue(value);
    dispatch(searchUsers(searchValue));
  }, 50);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDebouncedChange(e.target.value);
  };

  return (
    <div
      className={cn('relative hidden w-auto md:block', className)}
      onClick={() => {}}
    >
      <Input
        placeholder='Search'
        variant={'search'}
        value={searchValue}
        className={cn('relative hidden w-auto md:block', className)}
        onChange={onChange}
        onFocus={() => dispatch(isSearching(true))}
        // onBlur={() => dispatch(isSearching(false))}
      />
      <UserSearchList />
      <Button
        variant={'borderless'}
        size={'icon-sm'}
        className='absolute top-1/2 left-0.5 z-50 flex size-fit h-full -translate-y-1/2 rounded-none border-0 p-2'
      >
        <Search size={18} className='text-neutral-500' />
      </Button>
    </div>
  );
};
