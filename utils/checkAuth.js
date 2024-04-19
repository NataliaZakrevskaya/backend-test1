import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if(token){
        try{
            const decoded = jwt.verify(token, 'secret-key');
            req.userId = decoded._id;
            next()
        } catch (err) {
            return res.status(401).send('No token provided');
        }
    } else{
         return res.status(401).send('No token provided');
    }
}