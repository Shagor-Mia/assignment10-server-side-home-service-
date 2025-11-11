import admin from "../config/firbaseAdmin.js";

export const verifyFireBaseToken = async (req, res, next) => {
  const headerAuthorization = req.headers.authorization;
  // console.log(headerAuthorization);
  if (!headerAuthorization) {
    return res.status(401).send({ message: "unauthorize access!" });
  }
  const token = headerAuthorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: `token not found!` });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    console.log(`after token validation:`, decoded);
    req.user = decoded.email;
    next();
  } catch {
    return res.status(401).send({ message: `not validate token!` });
  }
};
