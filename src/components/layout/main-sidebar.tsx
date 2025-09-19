
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import {
    UilCreateDashboard,
    UilBriefcaseAlt,
    UilUsersAlt,
    UilColumns,
    UilClipboardAlt,
    UilSetting,
    UilAngleDown
} from '@iconscout/react-unicons';

const MainSidebar = () => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className="h-16 flex items-center p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <svg
              className="h-6 w-6 text-primary-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
              <path d="M20.6 20.6c-1.4-1.4-3.2-2.1-5.1-2.1h-1c-1.9 0-3.8.7-5.1 2.1" />
            </svg>
          </div>
          <h1 className="text-xl font-headline font-semibold data-[state=collapsed]:hidden group-data-[state=collapsed]:hidden">TalentStream</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" passHref>
                <SidebarMenuButton
                  isActive={pathname === '/'}
                  tooltip="Dashboard"
                >
                  <UilCreateDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="/jobs" passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith('/jobs')}
                  tooltip="Jobs"
                >
                  <UilBriefcaseAlt />
                  <span>Jobs</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="/candidates" passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith('/candidates')}
                  tooltip="Candidates"
                >
                  <UilUsersAlt />
                  <span>Candidates</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/board" passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith('/board')}
                  tooltip="Kanban Board"
                >
                  <UilColumns />
                  <span>Board</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/assessments" passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith('/assessments')}
                  tooltip="Assessments"
                >
                  <UilClipboardAlt />
                  <span>Assessments</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <Collapsible>
           <CollapsibleTrigger asChild>
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/21/40/40" alt="@johndoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden group-data-[state=collapsed]:hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john.doe@email.com</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 [&[data-state=open]>svg]:rotate-180 group-data-[state=collapsed]:hidden">
                <UilAngleDown className="h-4 w-4 transition-transform" />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
             <SidebarMenu className="px-2 pt-2">
                <SidebarMenuItem>
                  <Link href="#" passHref>
                    <SidebarMenuButton size="sm">
                      <UilSetting />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
             </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
