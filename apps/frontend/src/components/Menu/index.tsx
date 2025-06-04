import { autoUpdate, offset } from "@floating-ui/dom";
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react-dom-interactions";
import { useCallback, useState } from "react";

import BurgerIcon from "components/BurgerIcon";

import MenuItems from "./MenuItems";
import {
  largeScreenStyle,
  menuButtonStyle,
  smallScreenStyle,
} from "./styles.css";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const { context, floating, reference, strategy, x, y } = useFloating({
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

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div className={smallScreenStyle}>
        <button
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getReferenceProps({
            ref: reference,
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
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                },
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

export default Menu;
