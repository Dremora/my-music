import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return isFirstRender.current;
};

export const useIsFirstRenderForceRender = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useLayoutEffect(() => {
    setIsFirstRender(false);
  }, []);

  return isFirstRender;
};
