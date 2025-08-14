import { atom } from 'jotai';
import { type User } from '../_api/user';

function createProfileAtoms() {
  const profileAtom = atom<User | undefined>();

  const saveProfileAtom = atom(null, (_get, set, user: User) => {
    set(profileAtom, user);
  });

  const clearProfileAtom = atom(null, (_get, set) => {
    set(profileAtom, undefined);
  });

  return {
    profileAtom,
    saveProfileAtom,
    clearProfileAtom,
  };
}

const { profileAtom, saveProfileAtom, clearProfileAtom } = createProfileAtoms();

export { clearProfileAtom, profileAtom, saveProfileAtom };
