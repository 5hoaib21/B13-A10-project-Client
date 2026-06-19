'use client';
import { Button, Input } from '@heroui/react';
import { redirect } from 'next/navigation';


const SearchPrompt = () => {
    const onSearch = (e) => {
        e.preventDefault();
        redirect(`/prompts?search=${e.target.search.value}`);
    }
    return (
        <div className="flex items-center justify-center gap-2">
           <form onSubmit={onSearch}>
             <Input name='search' type='search' placeholder='Search prompts...' />
            <Button type='submit' size='sm' variant='outline'> Search</Button>
           </form>
        </div>
    );
};

export default SearchPrompt;