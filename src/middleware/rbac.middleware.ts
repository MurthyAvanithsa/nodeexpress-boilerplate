import { Request, NextFunction, Response } from 'express';

import { getDecodedToken, payload } from "../utils/decodeToken";

type Permission = {
    method: string,
    path: string,
};

type GroupRoleMapping = {
    group: string,
    role: string,
    status: boolean,
    permissions: Permission[],
};

// type Group = {
//     name: string,
//     status: boolean
//     role: {
//         name: string,
//         permissions: Permission[]
//     }[]
// };

const groupRoleMapping: GroupRoleMapping[] = [{
    group: "grp_viewer",
    role: "viewer",
    status: true,
    permissions: [{
        method: "GET",
        path: "/feed",
    },
    {
        method: "GET",
        path: "/feed/:id",
    }],
},
{
    group: "grp_editor",
    role: "editor",
    status: true,
    permissions: [{
        method: "GET",
        path: "/feed",
    },
    {
        method: "GET",
        path: "/feed/:id",
    },
    {
        method: "POST",
        path: "/feed",
    },
    {
        method: "PUT",
        path: "/feed",
    },
    {
        method: "DELETE",
        path: "/feed/:id",
    },
    {
        method: "GET",
        path: "/filter",
    },
    {
        method: "GET",
        path: "/filter/:id",
    }, {
        method: "POST",
        path: "/filter",
    }
    ],
},
{
    group: "grp_admin",
    role: "admin",
    status: true,
    permissions: [{
        method: "*",
        path: "*",
    }],
}];

export const checkRolesAndPermissions = (req: Request, res: Response, next: NextFunction) => {
    const decodeToken: payload = req.headers.authorization ? getDecodedToken(req.headers.authorization): {};
    const role = decodeToken?.["http://group"];
    const method = req.method;
    const path = req.path;
    const rolePermissions = groupRoleMapping.find(groupRole => groupRole.role === role && groupRole.status);
    if (!rolePermissions) {
        return res.status(403).json({ message: 'Forbidden - You do not have the necessary role' });
    }

    const hasPermission = rolePermissions.permissions.some(permission =>
        (permission.method === method || permission.method === '*') &&
        (permission.path === path || permission.path === '*')
    );

    if (hasPermission) {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden - You do not have the necessary permissions' });
    }
};