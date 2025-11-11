import admin from "../config/firbaseAdmin";

export const verifyFireBaseToken = async (req, res, next) => {
  const headerAuthorization = req.headers.headerAuthorization;
  if (!headerAuthorization) {
    return res.status(401).send({ message: "unauthorize access!" });
  }
  const token = headerAuthorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: `token not found!` });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    // console.log(`after token validation:`, decoded);
    req.token_email = decoded.email;
    next();
  } catch {
    return res.status(401).send({ message: `not validate token!` });
  }
};
