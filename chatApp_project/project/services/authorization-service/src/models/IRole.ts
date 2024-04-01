import {Document} from "mongoose";

export interface IRole {
    name: string,
    permissions: string[],
}

export interface IRoleModel extends IRole, Document {

}
