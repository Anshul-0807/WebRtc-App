const RoomModel = require("../models/room-model");

class RoomService {
  async create(payload) {
    const { topic, roomType, ownerId } = payload;
    const room = await RoomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  }

  async getAllRooms(types) {
    const rooms = await RoomModel.find({ roomType: { $in: types } })
      .populate({ path: 'speakers', select: 'avatar' })
      .populate({ path: 'ownerId', select: '_id' })
      .exec();
      console.log(rooms[0].speakers);
    return rooms;
  }
}
module.exports = new RoomService();
