import { UserDto } from "@data/dto/users.dto";
import { UserVo } from "@data/vo/users.vo";

function usersMapper(users: UserDto[]): UserVo[] {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
}

export { usersMapper };
