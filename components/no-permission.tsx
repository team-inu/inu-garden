import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NoPermission = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-5">
        <div className="text-xl">
          You dont have permission to access this page
        </div>
        <Link href="/course">
          <Button>Go back to course page</Button>
        </Link>
        <Image
          src="/images/inu_sleep.png"
          width={300}
          height={300}
          alt="No permission"
        />
      </div>
    </div>
  );
};

export default NoPermission;
