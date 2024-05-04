import { createContext, JSX, useContext, useEffect, useState } from "react";
import Navigation from "../interfaces/navigationProvider/navigation.ts";
import Actions from "../interfaces/navigationProvider/actions.ts";



const NavigationContext = createContext<Navigation | null>(null);

function NavigationProvider({ children }: { children: JSX.Element }) {
  const [history, setHistory] = useState<string[]>([]); // useState inside the component

  const actions: Actions = {
    add(path: string) {
      setHistory((prevState) => [...prevState, path]);
    },
    clear() {
      setHistory([]);
    },
    pop() {
      let newHistory: string[] = [];
      setHistory((prevState) => {
        let historyCopy = [...prevState];
        historyCopy.pop();
        newHistory = historyCopy
        return historyCopy;
      });
      return newHistory;
    }
  };

  return (
    <NavigationContext.Provider value={{ history, actions }}>
      {children}
    </NavigationContext.Provider>
  );
}
const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
export { NavigationProvider, useNavigation };
