import { type ChangeEvent, type FormEvent, useCallback, useState } from "react";
import { graphql, useMutation } from "react-relay";

import { Button } from "components/button";
import { Input } from "components/input";
import { Text } from "components/text";
import { useLogin } from "data/login";
import type { footerLoginMutation } from "generated/footerLoginMutation.graphql";

import { loginLinkStyle, rootStyle, spacerStyle } from "./styles.css";

const footerLoginMutation = graphql`
  mutation footerLoginMutation($password: String!) {
    login(password: $password)
  }
`;

export function Footer() {
  const { isLoggedIn, onLoggedIn, onLoggedOut } = useLogin();

  const [loginRequest, isLoggingIn] =
    useMutation<footerLoginMutation>(footerLoginMutation);

  const [passwordInput, setPasswordInput] = useState("");
  const [showingLogin, setShowingLogin] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const cancelLogin = useCallback(() => {
    setPasswordInput("");
    setShowingLogin(false);
    setWrongPassword(false);
  }, []);

  const setPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setWrongPassword(false);
      setPasswordInput(e.target.value);
    },
    [],
  );

  const login = useCallback(() => {
    loginRequest({
      variables: { password: passwordInput },
      onCompleted: (data) => {
        setPasswordInput("");

        if (data.login) {
          setShowingLogin(false);
          setWrongPassword(false);
          onLoggedIn(passwordInput);
        } else {
          setWrongPassword(true);
        }
      },
    });
  }, [loginRequest, onLoggedIn, passwordInput]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isLoggedIn) {
        onLoggedOut();
      } else {
        setShowingLogin(true);
      }
    },
    [isLoggedIn, onLoggedOut],
  );

  return (
    <form className={rootStyle} onSubmit={submit}>
      {showingLogin ? (
        <>
          <Input
            autoFocus
            disabled={isLoggingIn}
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
          <Button disabled={isLoggingIn} onClick={cancelLogin}>
            Cancel
          </Button>
          <div className={spacerStyle} />
          <Button disabled={isLoggingIn || !passwordInput} onClick={login}>
            Login
          </Button>
        </>
      ) : (
        <button
          className={loginLinkStyle({ disabled: isLoggingIn })}
          type="submit"
        >
          <Text color="lighterGrey" size="small">
            {isLoggingIn ? "Loading…" : isLoggedIn ? "Log out" : "Login"}
          </Text>
        </button>
      )}
    </form>
  );
}
