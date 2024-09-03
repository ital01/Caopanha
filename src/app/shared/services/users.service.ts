import { getApiUrl } from "../api/api";
import { UserVo } from "../data/vo/users.vo";
import { UserDto } from "../data/dto/users.dto";

function mapUsers(users: UserDto[]): UserVo[] {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
}

function getUsers(): Promise<UserVo[]> {
  return fetch(getApiUrl("users"))
    .then(response => response.json())
    .then(mapUsers);
}

export { getUsers };