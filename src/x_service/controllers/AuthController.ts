import { NextFunction, Request, Response } from "express";

const authenticateX = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Get Auth Tokens
	const data = req.params;
	console.log(data);

	// Get telegram token
	// Save to Database
	res.json({ message: "Hello World" });
};

export { authenticateX };
