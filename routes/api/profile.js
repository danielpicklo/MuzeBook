const express = require("express"),
	mongoose = require("mongoose"),
	axios = require("axios"),
	config = require("config"),
	router = express.Router(),
	jwt = require("jsonwebtoken"),
	{ check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile"),
	User = require("../../models/User"),
	Post = require("../../models/Post");

const checkObjectId = (idToCheck) => (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
		return res.status(400).json({ msg: "Invalid ID" });
	next();
};

router.get("/me", VerifyToken, async function (req, res) {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(400).json({ msg: "A profile does not exist." });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.post("/", VerifyToken, async function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const {
		bio,
		favoriteBands,
		youtube,
		instagram,
		bandcamp,
		soundcloud,
		spotify,
		appleMusic,
		facebook,
	} = req.body;

	const fields = {};
	fields.user = req.user.id;

	if (favoriteBands) {
		fields.favoriteBands = favoriteBands
			.split(",")
			.map((favoriteBands) => favoriteBands.trim());
	}
	if (bio) fields.bio = bio;

	fields.socials = {};

	if (youtube) fields.socials.youtube = youtube;
	if (instagram) fields.socials.instagram = instagram;
	if (bandcamp) fields.socials.bandcamp = bandcamp;
	if (soundcloud) fields.socials.soundcloud = soundcloud;
	if (spotify) fields.socials.spotify = spotify;
	if (appleMusic) fields.socials.appleMusic = appleMusic;
	if (facebook) fields.socials.facebook = facebook;

	try {
		let profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: fields },
			{ new: true, upsert: true, setDefaultsOnInsert: true }
		);
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.get("/", async function (req, res) {
	try {
		const profiles = await Profile.find().populate("user", [
			"name",
			"avatar",
		]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.get("/user/:user_id", checkObjectId("user_id"), async function (
	{ params: { user_id } },
	res
) {
	try {
		const profile = await Profile.findOne({
			user: user_id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) return res.status(400).json({ msg: "Profile not found" });

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server error" });
	}
});

function VerifyToken(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "No token" });
	}

	try {
		jwt.verify(token, config.get("tokensecret"), (error, decoded) => {
			if (error) {
				return res.status(401).json({ msg: "Invalid token" });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (err) {
		res.status(500).json({ msg: "Interal Server Error" });
	}
}

module.exports = router;
