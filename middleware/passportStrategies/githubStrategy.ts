import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import {userModel} from "../../models/userModel";
require('dotenv').config()

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: "http://127.0.0.1:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        console.log(profile)
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile.id)
        const d = userModel.createUser(profile._json.name, profile._json.email, undefined, 4)
        console.log(d)
        done(null, d);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
