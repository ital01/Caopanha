import { UserVo } from "@data/vo/users.vo";
import { getUsers } from "@services/users.service";

async function usersController():Promise<UserVo[]> {
  return await getUsers().then(users => {
    return users;
  });
}

const Users = await usersController();

export { Users };
