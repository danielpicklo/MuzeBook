const express = require("express"),
	router = express.Router(),
	config = require("config"),
	jwt = require("jsonwebtoken"),
	bcrypt = require("bcryptjs"),
	{ check, validationResult } = require("express-validator/check");

//Models
const User = require("../../models/User"),
	Post = require("../../models/Post"),
	Profile = require("../../models/Profile");

router.post(
	"/",
	[VerifyToken, [check("text", "Text is required to post.").not().isEmpty()]],
	async function (req, res) {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).json({ error: err.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			res.json(post);
		} catch (err) {
			console.error(err.message);
		}
	}
);

router.get("/", VerifyToken, async function (req, res) {
	try {
		const posts = await Post.find().sort({ time: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
	}
});

router.get("/:id", VerifyToken, async function (req, res) {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404);
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
	}
});

router.delete("/:id", VerifyToken, async function (req, res) {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404);
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401);
		}

		await post.remove();

		res.json({ msg: "Post successfully deleted" });
	} catch (err) {
		console.error(err.message);
	}
});

router.put("/love/:id", VerifyToken, async function (req, res) {
	try {
		const post = await Post.findById(req.params.id);
		if (
			post.loves.filter((love) => love.user.toString() === req.user.id)
				.length > 0
		) {
			return res
				.status(400)
				.json({ msg: "Post has already received love" });
		}

		post.loves.unshift({ user: req.user.id });
		await post.save();

		res.json(post.loves);
	} catch (err) {
		console.error(err.message);
	}
});

router.put("/unlove/:id", VerifyToken, async function (req, res) {
	try {
		const post = await Post.findById(req.params.id);
		if (
			post.loves.filter((love) => love.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: "Post has not received love" });
		}

		const remove = post.loves
			.map((love) => love.user.toString())
			.indexOf(req.user.id);
		post.loves.splice(remove, 1);

		await post.save();

		res.json(post.loves);
	} catch (err) {
		console.error(err.message);
	}
});

router.post(
	"/comment/:id",
	[
		VerifyToken,
		[check("text", "Text is required to comment.").not().isEmpty()],
	],
	async function (req, res) {
		const err = validationResult(req);

		if (!err.isEmpty()) {
			return res.status(400).json({ error: err.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");
			const post = await Post.findById(req.params.id);
			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();
			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
		}
	}
);

router.delete("/comment/:id/:comment_id", VerifyToken, async function (
	req,
	res
) {
	try {
		const post = await Post.findById(req.params.id);
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);

		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401);
		}

		const remove = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);
		post.comments.splice(remove, 1);

		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
	}
});

function VerifyToken(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}

	try {
		jwt.verify(token, config.get("tokensecret"), (error, decoded) => {
			if (error) {
				return res.status(401).json({ msg: "Token is not valid" });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (err) {
		res.status(500).json({ msg: "Server Error" });
	}
}

module.exports = router;
