import {IRoleRepository} from "../IRoleRepository";
import {IRoleModel}      from "../../models/IRole";
import {Role}            from "../../models/impl/Role";
import {injectable}      from "inversify";

@injectable()
export class RoleRepositoryImpl implements IRoleRepository {

    async getRoleById(id: string): Promise<IRoleModel | null> {
        return await Role.findOne({_id: id});
    }

    async getRoleByName(name: string): Promise<IRoleModel | null> {
        return await Role.findOne({name: name});
    }

}
