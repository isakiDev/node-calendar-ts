import { type Request, type Response } from 'express'
import { LoginUserDto, type AuthRepository, LoginUser } from '../../domain'

export class AuthController {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(data => { console.log(data) })
      .catch(error => { console.error(error) })
  }
}
