import { prisma } from '../../../../database/prisma-client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error('Invalid username or password');
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Invalid username or password');
    }

    const token = sign({ username }, 'd9aba5a59cf57aa177fa17b15eaa0cde', {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}
