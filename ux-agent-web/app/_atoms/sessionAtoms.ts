import { atom } from 'jotai';

function createSessionAtoms() {
  const accessTokenAtom = atom<string | null>();

  const saveAccessTokenAtom = atom(null, (_get, set, token: string) => {
    set(accessTokenAtom, token);
  });

  const clearAccessTokenAtom = atom(null, (_get, set) => {
    set(accessTokenAtom, null);
  });

  return {
    accessTokenAtom,
    saveAccessTokenAtom,
    clearAccessTokenAtom,
  };
}

const { accessTokenAtom, saveAccessTokenAtom, clearAccessTokenAtom } = createSessionAtoms();

export { accessTokenAtom, clearAccessTokenAtom, saveAccessTokenAtom };
