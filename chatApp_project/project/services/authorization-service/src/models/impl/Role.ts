import { Schema, Model, model} from "mongoose";
import {IRoleModel}            from '../IRole';

export var RoleSchema: Schema = new Schema({
    name: String,
    permissions: [String],
});

export const Role: Model<IRoleModel> = model<IRoleModel>("Role", RoleSchema);
