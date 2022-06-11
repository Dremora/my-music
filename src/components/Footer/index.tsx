import { useCallback, useState } from "react";

import Button from "components/Button";
import Input from "components/Input";
import Text from "components/Text";
import { useLogin } from "data/login";
import { useLoginMutation } from "generated/graphql";

import { loginLinkStyle, rootStyle, spacerStyle } from "./styles.css";

function Footer() {
  const { isLoggedIn, onLoggedIn, onLoggedOut } = useLogin();

  const [loginRequest, { loading }] = useLoginMutation();

  const [passwordInput, setPasswordInput] = useState("");
  const [showingLogin, setShowingLogin] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const cancelLogin = useCallback(() => {
    setPasswordInput("");
    setShowingLogin(false);
    setWrongPassword(false);
  }, []);

  const setPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setWrongPassword(false);
      setPasswordInput(e.target.value);
    },
    []
  );

  const login = useCallback(async () => {
    const result = await loginRequest({
      variables: { password: passwordInput },
    });

    setPasswordInput("");

    if (!result.data || !result.data.login) {
      setWrongPassword(true);
    } else {
      setShowingLogin(false);
      setWrongPassword(false);
      onLoggedIn(passwordInput);
    }
  }, [loginRequest, onLoggedIn, passwordInput]);

  const submit = useCallback(
    () => (isLoggedIn ? onLoggedOut() : setShowingLogin(true)),
    [isLoggedIn, onLoggedOut]
  );

  return (
    <form className={rootStyle} onSubmit={submit}>
      {showingLogin ? (
        <>
          <Input
            autoFocus
            disabled={loading}
            onChange={setPassword}
            placeholder={
              wrongPassword
                ? "Sorry, try again"
                : "Hey Dremora, please confirm your password"
            }
            type="password"
            value={passwordInput}
          />
          <div className={spacerStyle} />
          <Button disabled={loading} onClick={cancelLogin}>
            Cancel
          </Button>
          <div className={spacerStyle} />
          <Button disabled={loading || !passwordInput} onClick={login}>
            Login
          </Button>
        </>
      ) : (
        <button className={loginLinkStyle({ disabled: loading })} type="submit">
          <Text color="lighterGrey" size="small">
            {loading ? "Loading…" : isLoggedIn ? "Log out" : "Login"}
          </Text>
        </button>
      )}
    </form>
  );
}

export default Footer;
