const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('../helpers/jwt')
var randomstring = require("randomstring");
const sendmail = require('../helpers/sendmail');
require("dotenv").config();


const {TIME_SECRET,SECRETKEY, url_verifyEmail } = process.env;

module.exports = {
    registerUser: async (req, res) => {
        const { username, password, phone, email, image, name } = req.body;

        const checkUserName = await UserModel.find({ username });
        const checkEmail = await UserModel.find({ email });
        if (checkUserName.length > 0) {
           return res.json({
                statusCode: 404,
                msg: "Tên tài khoản đã được đăng ký"
            })
        }
        if (checkEmail.length > 0) {
           return res.json({
                statusCode: 404,
                msg: "Email đã được đăng ký"
            })
        }
        if (username.length <= 6 || password.length <= 6) {
           return res.json({
                statusCode: 404,
                msg: "Mật khẩu và tài khoản phải nhiều hơn 6 kí tự"
            })
        }
        const HashPassword = bcrypt.hashSync(password, saltRounds);
        const NewUser = new UserModel({
            username,
            password: HashPassword,
            name: username,
            phone,
            email,
            role: "USER",
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_632,h_316/https://gocsuckhoe.com/wp-content/uploads/2020/09/avatar-facebook-632x316.jpg",
            verificationcode: randomstring.generate(16),
            enable: false,
        });
        try {
            const user = await NewUser.save();
            sendmail(email, url_verifyEmail + user.verificationcode);
          return  res.json({
                statusCode: 200,
                msg: "Tạo tài khoản thành công",
            })
        }
        catch { err } {
           return res.json({
                statusCode: 404,
                msg: err,
            })
        }

    },
    loginUser : async(req,res)=>{
        const {username,password} = req.body;
        try{
            const checkUsername = await UserModel.findOne({
                username
            });
            if(!checkUsername.enable){
                return res.json({
                    statusCode : 404,
                    msg : "Tài khoản chưa được kích hoạt vui lòng đăng nhập vào gmail để kích hoạt"
                })
            }
            if(bcrypt.compareSync(password,checkUsername.password)){
                const token = await jwt.generateToken(checkUsername,SECRETKEY,TIME_SECRET);
                return res.json({
                    statusCode : 200,
                    jwt : token,
                    msg : "Đăng nhập thành công",
                })
            }
        }
        catch(err){
            res.json({
                statusCode: 403,
                msg : "Tài khoản không tồn tại"
            })
        }
    },
    verifyCode : async (req,res)=>{
        const {code} = req.params;
        try{
       
            const user = await UserModel.findOne({
                verificationcode : code
            });

          user.enable = true;
            await user.save(); 
            res.send("<h1 style='text-align:center'>Kích hoạt thành công</h1>");
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    getUser : async (req,res)=>{
        const {_id} = req.user.data;
        try{
            const user = await UserModel.findById(_id);
            res.json({
                username:user.username,
                name:user.name,
                phone:user.phone,
                email:user.email,
                image:user.image,
                role:user.role,
                ngaysinh:user.ngaysinh,
                sex:user.sex,
                enable:user.enable,
                id:user.id,
                statusCode:200,
            })
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    updateUser: async(req,res)=>{
        console.log(123);
        const { _id } = req.user.data;
        const {phone,sex,ngaysinh,currentPassword,newPassword,name} = req.body;
        const user = await UserModel.findById(_id);
        console.log(req.file);
        if(req.file){
            user.image="http://localhost:8080/image/"+req.file.originalname;
        }
        if(currentPassword||newPassword){
            if(bcrypt.compareSync(currentPassword,user.password)){
                user.password=bcrypt.hashSync(newPassword,saltRounds);
            }
            else{
                return res.json({
                    msg:"Password hiện tại chưa đúng",
                    statusCode:404,                   
                })   
            }
        }
        user.phone=phone;
        user.sex=sex;
        user.ngaysinh=ngaysinh;
        user.name=name;
        user.save();
        return res.json({
            msg:"Cập nhật tài khoản thành công",
            statusCode:200,
        })
    }
}