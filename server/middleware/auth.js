import jwt from "jsonwebtoken";

const secret = "test";

//middleware function to check the authentication
const auth = async (req, res, next) => {
  try {
    //getting the token from the header of request
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    //decoding and verifying the token
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      //attaching the userID to request
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
