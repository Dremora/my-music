import { useLogin } from "data/login";

import { Item } from "../Item";

import { itemsStyle } from "./styles.css";

type MenuItemsProps = {
  readonly closeMenu?: () => void;
};

export function MenuItems({ closeMenu }: MenuItemsProps) {
  const { isLoggedIn } = useLogin();

  return (
    <ul className={itemsStyle}>
      <Item href="/first-played" onClick={closeMenu}>
        First played
      </Item>
      <Item href="/years" onClick={closeMenu}>
        Years
      </Item>
      {isLoggedIn ? (
        <Item href="/albums/new" onClick={closeMenu}>
          New album
        </Item>
      ) : null}
    </ul>
  );
}
