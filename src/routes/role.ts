import { Router } from "express";

import { postRole } from "@controllers/Role/createRole";

const roleRouter = Router()

roleRouter.post('/', postRole)

export default roleRouter
