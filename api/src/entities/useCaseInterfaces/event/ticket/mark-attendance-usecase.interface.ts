export interface IMarkAttendanceUseCase {
  execute(qrCode: string): Promise<{ success: boolean; message: string }>;
}
