import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { FcBriefcase } from "react-icons/fc";

import avatar from '@public/images/avatar.jpg';
import { useLogout } from '@refinedev/core';
import { useLoggedIn } from 'src/hooks/useLoggedIn';


const Header: React.FC = () => {

  const { user, profile, isLoading, isError } = useLoggedIn();
  const [open, setOpen] = useState(false);
  const { mutate: logout } = useLogout();

  let menuRef = useRef();

  useEffect(() => {
    let menuHandler = (e: React.MouseEvent) => {
      
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", menuHandler);

    return () => {
      document.removeEventListener("mousedown", menuHandler);
    }
  }, []);

  return (
    <>
    <header className="absolute top-0 left-0 w-full z-20">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-5">
            {/* Logo */}
            <div className="logo">
              <Link href="/"><FcBriefcase className="text-4xl" /></Link>
            </div>

            {/* Navigation */}
            <nav className="grow font-inter">
              <ul className="flex justify-end gap-8 items-center">
                <li>
                    <Link href="/jobs/create" className="bg-primary-500 text-white px-6 py-3 rounded-lg">
                        Post a Job
                    </Link>
                </li>
                {user && (
                  <li>
                    <div className={`user-dropdown relative flex`} ref={menuRef}>
                      <button className='user-menu inline-flex items-center' onClick={()=>{setOpen(!open)}}>
                        <span className="overflow-hidden border-2 border-white rounded-full inline-block"><Image src={user ? profile?.avatar_url : avatar} width={30} height={30} alt="" /></span>
                      </button>
                      <div className={`user-dropdown-menu absolute top-full mt-2 right-0 bg-white p-5 shadow-lg flex flex-wrap flex-col rounded-lg ${open? 'active' : 'inactive'}`}>
                        <div className="user-info w-60 pb-4">
                          <div className="text-sm">Hi, {profile?.full_name}</div>
                          <div className="text-sm">
                            {profile?.positionname} | {profile?.country}
                          </div>
                        </div>
                        
                        <hr />

                        <ul className='pt-4 flex flex-col'>
                          <li className='flex'><Link href="/profile" className='w-full p-2 hover:bg-blue-100 rounded-md'>Profile</Link></li>
                          <li className='flex'><Link href="/profile/info" className='w-full p-2 hover:bg-blue-100 rounded-md'>Jobs</Link></li>
                          <li className='flex'><a href="#" onClick={() => logout()} className='w-full p-2 hover:bg-blue-100 rounded-md'>Logout</a></li>
                        </ul>

                      </div>
                    </div>
                  </li>

                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header