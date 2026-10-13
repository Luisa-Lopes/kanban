import { createContext, useContext, useState, ReactNode } from "react";

interface AgentBarContextProps {
  openAgentBar: boolean;
  setOpenAgentBar: (value: boolean) => void;
}

const AgentBarContext = createContext<AgentBarContextProps | undefined>(
  undefined,
);

export const AgentBarProvider = ({ children }: { children: ReactNode }) => {
  const [openAgentBar, setOpenAgentBar] = useState(false);

  return (
    <AgentBarContext.Provider value={{ openAgentBar, setOpenAgentBar }}>
      {children}
    </AgentBarContext.Provider>
  );
};

export const useAgentBar = () => {
  const context = useContext(AgentBarContext);
  if (!context) {
    throw new Error("useAgentBar deve ser usado dentro de um AgentBarProvider");
  }
  return context;
};
