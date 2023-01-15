/**
 * Icon to show the current user
 */

import { useSession } from "next-auth/react";
import Image from "next/image";

export const AuthIcon = () => {
  const session = useSession();
  if (!session.data?.user?.name) return null;

  return (
    <p className="mx-2 flex items-center gap-1 rounded text-xs hover:bg-white">
      {session.data.user.name}{" "}
      {session.data.user.image && (
        <Image
          className="inline rounded-full"
          src={session.data.user.image}
          alt="your profile image"
          width="35"
          height="35"
        />
      )}
    </p>
  );
};
