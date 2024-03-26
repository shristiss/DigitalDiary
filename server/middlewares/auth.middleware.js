import jwt from 'jsonwebtoken'

const auth = async(req,res,next) =>{
    try {
        //once the user signed in, he gets a token and in order to perform actions related to post, we need to validate the token
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error)
    }
}
export default auth;