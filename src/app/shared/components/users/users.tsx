import { Users } from "@controllers/user.controller";

export function ViewUsers() {

  return (
    <div>
      {Users.map(user => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
