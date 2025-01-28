import { container } from "tsyringe";
import { IClientRespository } from "../../../entities/repositoryInterfaces/client/client.respository.interface";
import { ClientRepository } from "../../../interfaceAdapters/repositories/client/client.repository";

export class ClientRepositoryRegistry {
  static registerRepositories(): void {
    container.register<IClientRespository>("IClientRespository", {
      useClass: ClientRepository,
    });
  }
}
