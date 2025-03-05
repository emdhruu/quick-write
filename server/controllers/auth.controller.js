import dbscript from "../utils/dbscript";

export const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;

    let existingUser = await dbscript.user.findUnique({
      where: { googleId: user.googleId },
    });

    if (!existingUser) {
      existingUser = await dbscript.user.create({ data: user });
    }

    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};
