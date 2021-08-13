import { Router } from "express";


const mockRouter = Router();

mockRouter.post("/employees", async (req, res) => {
    try {
      res.json(["employee1","employee2"]);
    } catch (ex) {
      res.json({ error: "failed" });
    }
  });
  
export default mockRouter ;