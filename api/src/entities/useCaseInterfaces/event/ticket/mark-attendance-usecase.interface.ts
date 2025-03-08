export interface IMarkAttendanceUseCase {
  execute(
    userId: any,
    qrCode: string
  ): Promise<{ success: boolean; message: string }>;
}
