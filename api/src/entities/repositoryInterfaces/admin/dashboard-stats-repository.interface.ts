export interface IDashBoardStatsRepository {
  getActiveEventsCount(): Promise<number>;
  getActiveClientsCount(): Promise<number>;
  getActiveVendorsCount(): Promise<number>;
  getActiveCategoriesCount(): Promise<number>;
}
