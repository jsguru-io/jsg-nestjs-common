export interface IScaffoldService {
  scaffold: (modelName: string) => Promise<void>;
}
