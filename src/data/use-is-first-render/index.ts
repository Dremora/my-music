import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useIsFirstRender() {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
}

export function useIsFirstRenderForceRender() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useLayoutEffect(() => {
    setIsFirstRender(false);
  }, []);

  return isFirstRender;
}
