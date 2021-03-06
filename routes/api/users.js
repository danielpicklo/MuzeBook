const express = require("express"),
	router = express.Router(),
	{ check, validationResult } = require("express-validator/check"),
	gravatar = require("gravatar"),
	bcrypt = require("bcryptjs"),
	jwt = require("jsonwebtoken"),
	config = require("config");

const User = require("../../models/User");

router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Valid email address is required").isEmail(),
		check("password", "Password must be 8 or more characters").isLength({
			min: 8,
		}),
	],
	async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists" }] });
			}

			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, config.get("tokensecret"), function (err, token) {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
