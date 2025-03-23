export interface IUpdatePasswordStrategy {
  update(email: string, password: string): Promise<void>;
}
