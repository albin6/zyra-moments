export interface ICreateNewCategoryUseCase {
  execute(title: string): Promise<void>;
}
