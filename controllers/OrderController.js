const OrderModel = require('../model/OrderModel');

module.exports = {
    paymentOnline: async (req, res) => {
        const { adress, products, payment, price } = req.body;

    },
    paymentOffline: async (req, res) => {
        const { address, products, payment } = req.body;
        const {_id} =req.user.data;
        try{
            const order = new OrderModel({
                products,
                address,
                payment,
                timeorder:Date.now(),
                status_order:false,
                id_user: _id
            })
            await order.save();
            return res.json({
                msg:"Đặt hàng thành công ",
                statusCode:200
            })
        }
        catch(err){
            return res.json({
                msg:"Có lỗi đặt hàng",
                statusCode:404
            })
        }
    },
    getOrder:async(req,res)=>{
        const {_id} =req.user.data;
        const order=await OrderModel.find({id_user:_id});
        console.log(order);
        return res.json(order);
    }
}