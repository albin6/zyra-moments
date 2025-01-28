import { ControllerRegistry } from "./auth/auth.controller.registry";
import { UseCaseRegistry } from "./auth/auth.usecase.registry";
import { ClientRepositoryRegistry } from "./client/auth.repository.registry";
import { VendorRepositoryRegistry } from "./vendor/vendor.repository.registry";

ClientRepositoryRegistry.registerRepositories();
VendorRepositoryRegistry.registerRepositories();

UseCaseRegistry.registerUseCases();

ControllerRegistry.registerControllers();
