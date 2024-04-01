import {inject, injectable} from "inversify";
import {IRoleRepository}    from "../repositories/IRoleRepository";
import {Types}              from "../types";
import * as Boom            from "@hapi/boom";
import {i18n}               from "../resources/i18n";
import {Role}               from '../models/impl/Role';

@injectable()
export class RoleController {

    private roleRepository: IRoleRepository;

    public constructor(
        @inject(Types.RoleRepository) roleRepository: IRoleRepository
    ) {
        this.roleRepository = roleRepository;
    }

    /**
     * Create a new role.
     * @param req
     * @param res
     * @param next
     */
    createRole = async (req, res, next) => {
        if (!req.body.name) {
            return next(Boom.badRequest(i18n.formatString(i18n.missingFieldError, 'name').toString()));
        }
        if (!req.body.permissions) {
            return next(Boom.badRequest(i18n.formatString(i18n.missingFieldError, 'permissions').toString()));
        }

        const role = new Role({
            name: req.body.name,
            permissions: req.body.permissions,
        });
        await role.save();
        res.send(role);
    };

    /**
     * Get one role by name.
     * @param req
     * @param res
     * @param next
     */
    getRoleByName = async (req, res, next) => {
        const role = await this.roleRepository.getRoleByName(req.params.name);
        if (!role) {
            return next(Boom.notFound(i18n.roleNotFoundError));
        }
        res.send(role);
    }
}
