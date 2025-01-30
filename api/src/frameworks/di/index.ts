import { RepositoryRegistry } from "./repository.registry";
import { ControllerRegistry } from "./controller.registry";
import { UseCaseRegistry } from "./usecase.registry";

export class DependencyInjection {
  static registerAll(): void {
    UseCaseRegistry.registerUseCases();
    ControllerRegistry.registerControllers();
    RepositoryRegistry.registerRepositories();
  }
}
