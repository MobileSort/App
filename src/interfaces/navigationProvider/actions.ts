export default interface Actions {
  pop: () => string[];
  clear: () => void;
  add: (path: string) => void;
}

