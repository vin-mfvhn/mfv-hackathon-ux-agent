import constate from 'constate';
import { useCallback, useState } from 'react';
import { destroyCookie, getCookie, setCookie } from '../utils/cookie';

function useHook() {
  const accessTokenKey = 'accessToken';

  const [accessToken, setAccessToken] = useState<string | undefined>(getCookie(accessTokenKey));

  const save = useCallback((token: string) => {
    setAccessToken(token);
    setCookie({ cname: accessTokenKey, cvalue: token });
  }, []);

  const clear = useCallback(() => {
    setAccessToken(undefined);
    destroyCookie(accessTokenKey);
  }, []);

  return {
    accessToken,
    save,
    clear,
  };
}

const [SessionProvider, useAccessToken, useSaveAccessToken, useClearAccessToken] = constate(
  useHook,
  (hook) => hook.accessToken,
  (hook) => hook.save,
  (hook) => hook.clear,
);

export { SessionProvider, useAccessToken, useClearAccessToken, useSaveAccessToken };
