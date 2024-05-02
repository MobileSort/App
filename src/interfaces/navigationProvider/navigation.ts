import Actions from "./actions.ts";

export default interface Navigation {
  history: string[];
  actions: Actions;
}
