import constate from 'constate';
import { useCallback, useState } from 'react';
import { type User } from '../api/user';

function useHook() {
  const [profile, setProfile] = useState<User | undefined>();

  const save = useCallback((user: User) => {
    setProfile(user);
  }, []);

  const clear = useCallback(() => {
    setProfile(undefined);
  }, []);

  return {
    profile,
    save,
    clear,
  };
}

const [ProfileProvider, useProfile, useSaveProfile, useClearProfile] = constate(
  useHook,
  (hook) => hook.profile,
  (hook) => hook.save,
  (hook) => hook.clear,
);

export { ProfileProvider, useClearProfile, useProfile, useSaveProfile };
