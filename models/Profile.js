const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	bio: {
		type: String,
		required: true,
	},
	favoriteBands: {
		type: [String],
		required: true,
	},
	socials: {
		youtube: {
			type: String,
		},
		instagram: {
			type: String,
		},
		bandcamp: {
			type: String,
		},
		soundcloud: {
			type: String,
		},
		spotify: {
			type: String,
		},
		appleMusic: {
			type: String,
		},
		facebook: {
			type: String,
		},
	},
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
