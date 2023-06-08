import { useContext } from "react";
import { GlobalStateContext } from "../contexts/globalStateContext";

export const useGlobalStateContext = () =>  useContext(GlobalStateContext);
