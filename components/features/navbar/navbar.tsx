'use client';

import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { Search } from '@/components/search';
import TeamSwitcher from '@/components/team-switcher';
import { UserNav } from '@/components/user-nav';

const Navbar = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
