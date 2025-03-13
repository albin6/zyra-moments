export interface IGetTheClientVendorConnectionStatusUseCase {
    execute(clientId: any, vendorId: any): Promise<boolean>
}