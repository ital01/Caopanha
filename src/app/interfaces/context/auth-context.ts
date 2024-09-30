import { iSignIn } from '../hooks/auth';
import { iUserProps } from '../hooks/user';

export interface iAuthContextProps {
  user: iUserProps | null;
  signIn: ({ ...props }: iSignIn) => Promise<string | undefined>;
  logout: () => void;
  me: () => Promise<boolean>;
}

export interface SignAuthProps {
  cpf: string;
  password: string;
}
