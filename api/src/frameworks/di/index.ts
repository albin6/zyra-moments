import { UseCaseRegistry } from "./auth/auth-usecase-registry";
import { ControllerRegistry } from "./auth/auth-controller-registry";
import { ClientRepositoryRegistry } from "./client/client-repository-registry";
import { VendorRepositoryRegistry } from "./vendor/vendor-repository-registry";
import { AdminRepositoryRegistry } from "./admin/admin-repository-registry";

ClientRepositoryRegistry.registerRepositories();
VendorRepositoryRegistry.registerRepositories();
AdminRepositoryRegistry.registerRepositories();

UseCaseRegistry.registerUseCases();

ControllerRegistry.registerControllers();
