import { Router } from "express";
import { generateUser} from "../mocks.js";

const router = Router();

router.get('/api/mockingproducts', (req, res) => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const userMock = generateUser();
    users.push(userMock);
  }
  res.json(users);
});

export default router;
