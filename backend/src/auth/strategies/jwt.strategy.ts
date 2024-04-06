import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // Extracts JWT from the Authorization header.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Secret key used to verify the JWT signature.
      secretOrKey: process.env.JWT_SECRET_KEY,
      // Options for signing the JWT token.
      signOptions: { expiresIn: "1d" },
    });
  }
  async validate(payload: any) {
    try {
      // Validate the user based on the payload extracted from the JWT.
      const user = await this.authService.validateUser(payload.email);
      // Throw error if user is not found.
      if (!user) {
        throw new Error("User not found");
      }
      // Return the validated user.
      return user;
    } catch (error) {
      // Throw error if validation fails.
      throw new Error("Unauthorized");
    }
  }
}
