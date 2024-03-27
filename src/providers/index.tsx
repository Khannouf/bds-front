import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default Providers;