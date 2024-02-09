import asyncHandler from 'express-async-handler'

const logRequestBodyData = asyncHandler(async (req, res, next) => {
    try {
      if (req.method === "POST" || req.method === "PUT") {
        console.log(req.method, req.path, "req.body:", req.body);
        console.log(req.method, req.path, 'req.file:', req.file);
      } else {
        console.log(req.method, req.path);
      }
  
      next();
    } catch (error) {
      next(error);
    }
  }); 
  
  export default logRequestBodyData;
  