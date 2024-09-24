import { Request, NextFunction, Response } from 'express';

import { logger } from '../logger/log';

export interface customRequest extends Request {
    auth :{
        [key: string]: string
    }
}


type GroupRoleMapping = {
    [key: string]: {
        role: string,
        [key: string]: boolean | string
    }
}
const groupRoleMapping: GroupRoleMapping = {
    grp_viewer: {
        role: "viewer",
        "GET_/feed": true,
        "GET_/feed:id": true,
        "GET_/filter": true,
        "GET_/filter:id": true,
    },
    grp_editor: {
        role: "editor",
        "GET_/feed": true,
        "GET_/feed:id": true,
        "POST_/feed": true,
        "PUT_/feed:id": true,
        "GET_/filter": true,
        "GET_/filter:id": true,
        "PUT_/filter:id": true,
    },
    grp_admin: {
        role: "admin",
        "*_*": true
    }
}
export const checkRolesAndPermissions = (req: Request, res: Response, next: NextFunction) => {
    const group = (req as customRequest).auth?.["http://group"];
    logger.info(group);
    const method = req.method;
    const path = req.path;

    const groupPermissions: {
        role: string,
        [key: string]: boolean | string
    } = groupRoleMapping[group];
    if (!groupPermissions) {
        return res.status(403).json({ message: 'Forbidden - You do not have the necessary role' });
    } else if (groupPermissions["*_*"] === true) {
        return next();
    } else {
        const pathPermissions: string | boolean = groupPermissions[`${method}_${path}`];
        if (pathPermissions === true) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden - You do not have the necessary permissions' });
    }
};