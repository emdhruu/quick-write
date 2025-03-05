import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL;

if (!clientID || !clientSecret || !callbackURL) {
  throw new Error("Google OAuth credentials are missing in .env");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      passReqToCallback: true,
      scope: ["profile", "email", "https://www.googleapis.com/auth/drive.file"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
          accessToken,
          refreshToken,
        };

        cb(null, user);
      } catch (error) {
        cb(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
