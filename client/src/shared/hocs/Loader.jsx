import { Quantum } from "ldrs/react";
import "ldrs/react/Quantum.css";

export default function Loader({ children, isLoading }) {
  if (isLoading) {
    return <Quantum size="100" speed="2.5" color="rgba(91, 176, 229)" />;
  }
  return children;
}
