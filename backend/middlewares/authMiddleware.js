import Jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.token;
  // console.log(req.headers);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(404).json({
      massege: "unauthorized1",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decode = Jwt.verify(token, process.env.JWT_KEY);

    if (!decode) {
      return res.status(411).json({
        message: "unauthorized",
        token: decode,
      });
    }

    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(404).json({});
  }
}

export { authMiddleware };
