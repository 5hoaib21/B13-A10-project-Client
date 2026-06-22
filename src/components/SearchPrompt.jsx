// components/SearchPrompt.jsx
'use client';
import { Button, Input } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SearchPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams?.get('search') || '');
  
  const onSearch = (e) => {
    e.preventDefault();
    const search = e.target.search?.value || searchValue;
    
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (search && search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    
    router.push(`/prompts?${params.toString()}`);
  };
  
  return (
    <form onSubmit={onSearch} className="flex items-center gap-2">
      <Input 
        name="search"
        type="search" 
        placeholder="Search prompts..." 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="sm" color="primary">
        Search
      </Button>
    </form>
  );
};

export default SearchPrompt;



















// 'use client';
// import { Button, Input } from '@heroui/react';
// import { redirect } from 'next/navigation';


// const SearchPrompt = () => {
//     const onSearch = (e) => {
//         e.preventDefault();
//         redirect(`/prompts?search=${e.target.search.value}`);
//     }
//     return (
//         <div className="flex items-center justify-center gap-2">
//            <form onSubmit={onSearch}>
//              <Input name='search' type='search' placeholder='Search prompts...' />
//             <Button type='submit' size='sm' variant='outline'> Search</Button>
//            </form>
//         </div>
//     );
// };

// export default SearchPrompt;