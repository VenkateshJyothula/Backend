const mongoose = require('mongoose');
const userModel = require('./userModel.js');

const canvasSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Ensure reference is consistent
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    elements: {
      type: [{ type: mongoose.Schema.Types.Mixed }],
    },
    shared_with: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User", // Fixed reference from "user" to "User"
    },
  },
  {
    timestamps: true,
    collection: "Canvas", // Fixed from "collections" to "collection"
  }
);

// Get all canvases by user email
canvasSchema.statics.getAllCanvases = async function (email) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const canvases = await this.find({
      $or: [{ owner: user._id }, { shared_with: user._id }],
    });

    return canvases;
  } catch (error) {
    throw new Error("Failed to get Canvases: " + error.message);
  }
};

canvasSchema.statics.loadCanvas = async function (email,id) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const canvases = await this.find({
      $or: [{ owner: user._id }, { shared_with: user._id }],_id:id
    });

    return canvases;
  } catch (error) {
    throw new Error("Failed to get Canvases: " + error.message);
  }
};


canvasSchema.statics.createCanvas = async function (email, name) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const canvas = new this({
      owner: user._id,
      name,
      elements: [],
      shared_with: [],
    });

    const newCanvas = await canvas.save();
    return newCanvas;
  } catch (error) {
    throw new Error("Failed to create Canvas: " + error.message);
  }
};


canvasSchema.statics.deleteCanvas=async function(email,id)
{
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const canvas = await this.findOne({_id:id});
    console.log(canvas.owner)
    console.log(user._id);
    if(canvas.owner=user._id)
    {
      await this.findByIdAndDelete(id);
    }
    else throw new Error("Canvas can only be deleted by owner");
  } catch (error) {
    throw new Error("Failed to get Canvases: " + error.message);
  }
}

canvasSchema.statics.updateCanvas=async function ( id, elements) {
    // Update the canvas in the database using email, id, and elements
    return await this.updateOne({_id: id }, { elements });
}


const canvasModel = mongoose.model("Canvas", canvasSchema);

module.exports = canvasModel;
