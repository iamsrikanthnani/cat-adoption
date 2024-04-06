import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // Secret key used to sign JWT tokens.
      secret: process.env.JWT_SECRET_KEY,
      // Options for signing the JWT token.
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [
    // Provide necessary services and strategies.
    AuthService,
    JwtStrategy,
    {
      provide: APP_PIPE,
      // Use ValidationPipe for request payload validation.
      useClass: ValidationPipe,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
