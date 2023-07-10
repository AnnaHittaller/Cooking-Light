import User from "../model/User.js";

export const handleListUsers = async (req, res) => {
	try {
		const users = await User.find();
		console.log(users)
		res.send(users);
	} catch (error) {
		console.log("error listing user:", error.message);
		res.send("Error in listing a user", error.message);
	}
};

export const handleAddUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body);
		console.log("new user:", newUser);

		res.send("user inserted into db");
	} catch (error) {
		console.log("error adding user:", error.message);
		res.send("Error in adding a user", error.message);
	}
	console.log(req.body);

	//res.send("hello from users/add");
};


export const handleDeleteUser = async (req, res) => {
	console.log("handleDeleteUser:", req.params)
	try {
		const deleteUser = await User.findByIdAndDelete(req.params.id)
		res.send("user deleted from db");
	} catch (error) {
		console.log("error deleting user:", error.message);
		res.send("Error in deleting a user", error.message);
	}
	console.log(req.body);

	
};

export const handleEditUser = async (req, res) => {
	//console.log("handleEditUser:", req.body);
	try {
		const editedUser = await User.findByIdAndUpdate(req.body._id, req.body, {new: true});
		res.send("user edited in db");
	} catch (error) {
		console.log("error editing user:", error.message);
		res.send("Error in editing a user", error.message);
	}
	//console.log(req.body);
};

