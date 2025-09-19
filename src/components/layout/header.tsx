
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useState, useEffect } from 'react';
import { UilSearch, UilBell } from '@iconscout/react-unicons';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { type Candidate } from '@/lib/types';
import { initialCandidates } from '@/lib/data';
import Link from 'next/link';
import { UilSpinner, UilFileSearchAlt } from '@iconscout/react-unicons';

const RouteDisplay = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullPath = `${pathname}?${searchParams.toString()}`.replace(/\?$/, '');

  return (
     <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium text-muted-foreground">ROUTE:</span>
        <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm whitespace-nowrap">{fullPath}</span>
    </div>
  )
}

const GlobalSearch = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [candidates, , isLoaded] = useLocalStorage<Candidate[]>('kanban-candidates', initialCandidates);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        if (searchQuery.length > 1) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const results = candidates.filter(c => 
                c.name.toLowerCase().includes(lowercasedQuery) || 
                c.email.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredCandidates(results.slice(0, 5)); // Limit to 5 results
            setIsPopoverOpen(true);
        } else {
            setFilteredCandidates([]);
            setIsPopoverOpen(false);
        }
    }, [searchQuery, candidates]);

    const handleResultClick = () => {
        setIsPopoverOpen(false);
        setSearchQuery('');
    };

    return (
        <form className="ml-auto flex-1 sm:flex-initial">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <div className="relative">
                     <UilSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <PopoverTrigger asChild>
                        <Input
                            type="search"
                            placeholder="Search candidates..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.length > 1 && setIsPopoverOpen(true)}
                        />
                    </PopoverTrigger>
                </div>
                <PopoverContent className="w-[300px] lg:w-[300px] md:w-[200px] p-0" align="start">
                    <div className="p-2">
                        {!isLoaded ? (
                            <div className="flex items-center justify-center p-4">
                                <UilSpinner className="h-5 w-5 animate-spin text-muted-foreground" />
                            </div>
                        ) : filteredCandidates.length > 0 ? (
                            <div className="space-y-1">
                                {filteredCandidates.map(candidate => (
                                    <Link key={candidate.id} href={`/candidates/${candidate.id}`} passHref>
                                        <div onClick={handleResultClick} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{candidate.name}</p>
                                                <p className="text-xs text-muted-foreground">{candidate.email}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-4">
                                <UilFileSearchAlt className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm font-medium">No results found</p>
                                <p className="text-xs text-muted-foreground">Try a different search term.</p>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </form>
    );
};


type AppHeaderProps = {
  title: string;
};

const AppHeader = ({ title }: AppHeaderProps) => {

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className='flex-1 items-center gap-4 hidden md:flex'>
        <h1 className="text-lg font-semibold md:text-2xl font-headline whitespace-nowrap">
          {title}
        </h1>
        <Suspense fallback={null}>
          <RouteDisplay />
        </Suspense>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <GlobalSearch />
        <Button variant="ghost" size="icon" className="rounded-full">
          <UilBell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/21/40/40" alt="@johndoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;

    