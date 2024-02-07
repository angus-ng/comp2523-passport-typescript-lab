import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
require('dotenv').config()

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: "http://127.0.0.1:8000/auth/oauth/github/callback",
        passReqToCallback: true,
    },
    
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
        console.log(profile)
        console.log(accessToken)
        console.log(refreshToken)
        done(null, {id: 2,
        name: String(profile.name),
        email: String(profile.email)});
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
