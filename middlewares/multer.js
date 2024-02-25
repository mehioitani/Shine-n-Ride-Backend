const multer = require("multer");
const path = require("path");
const maxSize = 20 * 1024 *1024;
 const storage = multer.diskStorage({
        destination:(req,file, callback)=>{
            callback(null,  path.resolve(process.cwd(), 'frontside/public/uploads'));
        },
        fileName: (req, file, callback)=>{
            callback(null, Date.now()+ "--"+ path.extname(file.originalname));
            console.log(file.originalname)
        },
    })

const upload = multer({
    storage:storage,
    fileFilter:(req,file,callback)=>{
        if(
            file.mimetype == "image/png"||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "video/mp3" ||
            file.mimetype == "video/mp4"
        ){
            callback(null, true);
        } else{
            callback(null,false)
            return callback(new Error("Only .png, .jpg, .jpeg, .mp3, .m4 allowed"))
        }
    },
    limits:{fileSize: maxSize}
});

module.exports = upload