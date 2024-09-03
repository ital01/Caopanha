import { getApiUrl } from "@api/api";
import { UserVo } from "@data/vo/users.vo";
import { usersMapper } from "@data/mapper/users.mapper";

function usersService(): Promise<UserVo[]> {
  return fetch(getApiUrl("users"))
    .then(response => response.json())
    .then(usersMapper);
}

export { usersService as getUsers };
