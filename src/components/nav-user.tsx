import React from "react";
import { LogoutButton } from "./logout-button";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getAccount } from "@/actions/account";
import { getSession } from "@/actions/session";

export const NavUser: React.FC = async () => {
  const session = await getSession()
  
  const user = session.isAuthenticated ? await getAccount() : undefined

  return ( user &&
    <div>
      {user === undefined ? null : (
        <div className="flex items-center">
          <FaRegBell className="text-primary-dark" />
          <Link
            className="mx-2"
            href={"/profile"}
          >{`${user.first_name} ${user.last_name}`}</Link>
          <Avatar className="mr-4 h-10 w-10 ">
            <AvatarImage src={user.photo} />
            <AvatarFallback>
              {user.first_name[0]}
              {user.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};
