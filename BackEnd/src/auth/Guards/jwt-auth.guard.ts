import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add custom logic if needed before calling super.canActivate()
    return super.canActivate(context);
  }

  handleRequestUser(err, user) {
    // You can throw an error based on custom logic here
    if (err || !user) {
      // You can customize the error message or status code as needed
      throw err || new UnauthorizedException('Unauthorized access');
    }
    return user;
  }
  handleRequestDoctor(err, doctor) {
    // You can throw an error based on custom logic here
    if (err || !doctor) {
      // You can customize the error message or status code as needed
      throw err || new UnauthorizedException('Unauthorized access');
    }
    return doctor;
  }
}
