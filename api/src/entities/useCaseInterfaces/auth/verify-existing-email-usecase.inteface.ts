export interface IVerifyExistingEmailUseCase {
    execute(email: string): Promise<void>
}