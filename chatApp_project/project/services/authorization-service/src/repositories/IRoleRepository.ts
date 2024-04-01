import {IRoleModel} from "../models/IRole";

export interface IRoleRepository {

    getRoleById(id: string): Promise<IRoleModel | null>;

    getRoleByName(name: string): Promise<IRoleModel | null>;

}
