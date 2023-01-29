import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { FiFile, FiLogOut, FiUser } from 'react-icons/fi';

import { logout } from 'lib/auth';
import useAuthUser from 'lib/hooks/useAuthUser';
import { AuthUser } from 'lib/types';

import { Text } from 'components/ui/Typography';

interface Props {
  user: AuthUser;
}

const Account: React.FC<Props> = ({ user }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Menu className="relative" as={'div'}>
      <Menu.Button className="bg-primary-blue flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
        <Image src={user.user_metadata.avatar_url} width={40} height={40} alt="avatar" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-3 flex flex-col space-y-5 rounded-lg bg-system-grey6 p-4">
          <Link
            href={'/'}
            className="text-primary-white transition-colors hover:text-system-grey4"
          >
            <Text variant="body" className="flex items-center">
              <FiFile size={16} className="mr-2" />
              Projects
            </Text>
          </Link>
          <Link
            href={'/settings'}
            className="text-primary-white transition-colors hover:text-system-grey4"
          >
            <Text variant="body" className="flex items-center">
              <FiUser size={16} className="mr-2" />
              Settings
            </Text>
          </Link>
          <button onClick={() => logout()}>
            <Text
              variant="body"
              className="flex items-center text-primary-white hover:text-system-grey4 "
            >
              <FiLogOut size={16} className="mr-2" />
              Log out
            </Text>
          </button>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type NavBarProps = {
  color?: string;
  size?: 'regular' | 'small';
  className?: string;
  breadcrumbs?: React.ReactElement;
};

function NavigationBar(props: NavBarProps) {
  const { breadcrumbs } = props;

  const user = useAuthUser();

  return (
    <div
      className={`z-100 fixed top-0 left-0 right-0 flex h-16 w-full items-center justify-between border-b border-system-grey6 bg-primary-black px-3 text-primary-white ${props.className}`}
    >
      <div className="flex items-center space-x-6">
        <Link href="/">
          <Image
            className="h-10"
            src="/logo.svg"
            width={40}
            height={40}
            alt="Unweave Logo"
          />
        </Link>
        {breadcrumbs || null}
      </div>

      <div className="flex items-center space-x-8">
        <Account user={user} />
      </div>
    </div>
  );
}

export default NavigationBar;
