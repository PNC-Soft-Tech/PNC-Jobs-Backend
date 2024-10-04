import express from "express";

import { auth } from "../../middlewares/auth";
import { getLeaderboardData } from "./leaderboard.controller";

const router = express.Router();
router.get("/", getLeaderboardData);

export const contestRouter = router;
