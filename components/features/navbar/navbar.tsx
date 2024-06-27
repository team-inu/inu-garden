'use client';

import Image from 'next/image';

import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { Badge } from '@/components/ui/badge';
import { UserNav } from '@/components/user-nav';
import { useAuth } from '@/hooks/auth-hook';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* <TeamSwitcher /> */}
          <div className="flex items-center space-x-1">
            <Image src="/images/inu.png" width={40} height={40} alt="Inu" />
            <div className="text-lg">Inu</div>
          </div>
          <MainNav className="mx-6" role={user.data?.role.toUpperCase()} />
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <Badge variant="green">{user.data?.role.toUpperCase()}</Badge>
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
