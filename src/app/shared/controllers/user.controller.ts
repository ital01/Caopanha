import { UserVo } from "@data/vo/users.vo";
import { getUsers } from "@services/users.service";
import { useEffect, useState } from "react";

async function usersController():Promise<UserVo[]> {
  return await getUsers().then(users => {
    return users;
  });
}

export default function Users():UserVo[] {
  const [users, setUsers] = useState<UserVo[]>([]);

  useEffect(() => {
    usersController().then((fetchedUsers: UserVo[]) => {
      setUsers(fetchedUsers);
    });
  }, []);

  return users;
}


