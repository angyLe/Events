import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useLocationChanged = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("%c location changed", "color: purple");
    console.log("");
    //Do something
  }, [location]);
};

export default useLocationChanged;
