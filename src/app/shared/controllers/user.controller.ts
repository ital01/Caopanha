import { UserVo } from "../data/vo/users.vo";
import { getUsers } from "../services/users.service";

async function usersController():Promise<UserVo[]> {
  return await getUsers().then(users => {
    console.log(users);
    return users;
  });
}

export { usersController };