import { prisma } from '../../../../database/prisma-client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new Error('Invalid username or password');
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Invalid username or password');
    }

    const token = sign({ username }, 'd9aba5a59cf57aa177fa17b15eaa0cde', {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return token;
  }
}
