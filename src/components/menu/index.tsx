import {
  autoUpdate,
  FloatingPortal,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";

import { BurgerIcon } from "components/burger-icon";

import { MenuItems } from "./menu-items";
import {
  largeScreenStyle,
  menuButtonStyle,
  smallScreenStyle,
} from "./styles.css";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    placement: "bottom-end",
    middleware: [offset(12)],
    whileElementsMounted: autoUpdate,
    onOpenChange: setIsOpen,
    open: isOpen,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useDismiss(context),
    useClick(context),
  ]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={smallScreenStyle}>
        <button
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getReferenceProps({
            ref: refs.setReference,
          })}
          className={menuButtonStyle}
          type="button"
        >
          <BurgerIcon />
        </button>
        <FloatingPortal>
          {isOpen ? (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getFloatingProps({
                ref: refs.setFloating,
                style: floatingStyles,
              })}
            >
              <MenuItems closeMenu={closeMenu} />
            </div>
          ) : null}
        </FloatingPortal>
      </div>

      <div className={largeScreenStyle}>
        <MenuItems />
      </div>
    </>
  );
}
