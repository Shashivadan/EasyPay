import zod from "zod";
import Users from "../models/users.model.js";
import Accounts from "../models/accounts.model.js";

import Jwt from "jsonwebtoken";

const signupValdutionScheme = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(4),
});

async function SignUp(req, res) {
  const userData = req.body;

  const { success } = signupValdutionScheme.safeParse(userData);

  if (!success) {
    return res.status(411).json({
      massage: "failed to signUp",
      success: success,
    });
  }

  const existingUser = await Users.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({
      massage: "Email already taken/Incorrect inputs",
    });
  }

  try {
    const newUser = await Users.create({
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      password: userData.password,
    });

    if (!newUser) {
      return res.status(411).json({
        massage: "something went wrong",
      });
    }

    const userId = newUser._id;

    await Accounts.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = Jwt.sign({ userId }, process.env.JWT_KEY);

    return res.status(200).json({
      massage: "successfully create a newuser",
      token: token,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
}

const signInValidationSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(4),
});

async function SignIn(req, res) {
  const signUser = req.body;

  const { success } = signInValidationSchema.safeParse(signUser);

  if (!success) {
    return res.status(411).json({
      massage: "Error while logging in",
    });
  }

  try {
    const user = await Users.findOne({
      username: signUser.username,
      password: signUser.password,
    });

    if (!user) {
      return res.status(411).json({
        message: "Error while logging in",
      });
    }

    const userId = user._id;

    const token = Jwt.sign({ userId }, process.env.JWT_KEY);

    return res.status(202).json({
      token: token,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
}

const updateUserValidation = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

async function updateUser(req, res) {
  const userId = req.userId;
  const updatedUserData = req.body;

  const { success } = updateUserValidation.safeParse(updatedUserData);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }

  try {
    const user = await Users.findByIdAndUpdate(userId, {
      password: updatedUserData.password,
      firstname: updatedUserData.firstname,
      lastname: updatedUserData.lastname,
    });

    if (!user) {
      return res.status(411).json({
        message: "Error while updating information",
      });
    }
    console.log(user);

    return res.status(200).json({
      user: user,
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(411).json({
      error: error,
    });
  }
}

async function bluk(req, res) {
  const filter = req.query.filter;

  try {
    if (!filter || filter == "") {
      const allUsers = await Users.find({});
      return res.status(202).json({
        users: allUsers.map((user) => {
          return {
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id,
          };
        }),
      });
    }

    const users = await Users.find({
      $or: [
        {
          firstname: {
            $regex: filter,
          },
        },
        {
          lastname: {
            $regex: filter,
          },
        },
      ],
    });

    return res.status(200).json({
      users: users.map((item) => {
        return {
          firstname: item.firstname,
          lastname: item.lastname,
          _id: item._id,
        };
      }),
    });
  } catch (error) {
    return res.status(411).json({
      massage: "database not working for some reason",
      error,
    });
  }
}

export { SignUp, SignIn, updateUser, bluk };
