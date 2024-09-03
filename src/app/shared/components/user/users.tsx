import { usersController } from "../../controllers/user.controller";

const users = await usersController();

export function Users() {

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}