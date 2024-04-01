import {Container}          from "inversify";
import {IRoleRepository}    from "./repositories/IRoleRepository";
import {Types}              from "./types";
import {RoleRepositoryImpl} from "./repositories/impl/RoleRepositoryImpl";
import {RoleController}     from "./controllers/RoleController";

const container = new Container();

container.bind<IRoleRepository>(Types.RoleRepository).to(RoleRepositoryImpl);
container.bind<RoleController>(Types.RoleController).to(RoleController);

export default container;
