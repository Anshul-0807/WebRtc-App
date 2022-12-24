const roomService = require("../Services/room-service");

class RoomsController{
    async create(req, res){
        // room
        const { topic, roomType } = req.body;

        if(!topic || !roomType ){
            return res.status(400).json({message: 'All fields is required!'})
        }

        const room = await roomService.create({
          topic,
          roomType,
          ownerId: req.user_Id,
        });
    }
}

module.exports = new RoomsController();