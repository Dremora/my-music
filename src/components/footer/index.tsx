import { type ChangeEvent, type FormEvent, useState } from "react";
import { graphql, useMutation } from "react-relay";

import type { footerLoginMutation } from "@/generated/relay/footerLoginMutation.graphql";
import { Button } from "components/button";
import { Text } from "components/text";
import { TextInput } from "components/text-input";
import { useLogin } from "data/login";

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

  const cancelLogin = () => {
    setPasswordInput("");
    setShowingLogin(false);
    setWrongPassword(false);
  };

  const setPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setWrongPassword(false);
    setPasswordInput(e.target.value);
  };

  const login = () => {
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
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoggedIn) {
      onLoggedOut();
    } else {
      setShowingLogin(true);
    }
  };

  return (
    <form className={rootStyle} onSubmit={submit}>
      {showingLogin ? (
        <>
          <TextInput
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
