import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import { findOrCreate } from '../../controllers/userController';
require('dotenv').config()

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: "http://127.0.0.1:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        const user = findOrCreate(profile.id, profile.displayName, profile._json.email);
        done(null, user);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
