import {
  getAuth,
  signInWithPopup,
  UserCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { googleAuthProvider } from "./firebase";

interface AuthServiceI {
  hadleLogin: (type: ProviderType) => Promise<UserCredential>;
  handleSignOut: () => void;
  onAuthChange: (cb: (user: any) => void) => void;
}

export type ProviderType = "google";

export class AuthService implements AuthServiceI {
  protected auth = getAuth();

  hadleLogin = (type: ProviderType) => {
    return signInWithPopup(this.auth, this.getProvier(type));
  };

  handleSignOut = () => {
    signOut(this.auth).then();
  };

  onAuthChange = (cb: (user: any) => void) => {
    onAuthStateChanged(this.auth, (user) => cb(user));
  };

  protected getProvier = (type: ProviderType) => {
    switch (type) {
      case "google":
        return googleAuthProvider;
    }
  };
}
