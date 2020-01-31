import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLocationChanged = () => {
  const location = useLocation();

  const resetState = useDispatch();

  useEffect(() => {
    console.log("%c location changed", "color: purple");
    console.log("");
    resetState({ type: "RESET" });
  }, [location, resetState]);
};

export default useLocationChanged;
