import { Router } from "express";
import { MocksControllers } from "../controllers/mock.controllers.js";

const mocksControllers = new MocksControllers();

const router = Router();

router.get("/mockingusers", mocksControllers.createUsers);
router.get("/mockingpets", mocksControllers.createPets);
router.post("/generateData/:users/:pets", mocksControllers.createByParams);

export default router;
