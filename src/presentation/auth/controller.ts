import { type Request, type Response } from 'express'
import { LoginUserDto, type AuthRepository, LoginUser, RegisterUserDto, RegisterUser } from '../../domain'

export class AuthController {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  login = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(data => { console.log(data) })
      .catch(error => { console.error(error) })
  }

  register = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => { console.log(data) })
      .catch(error => { console.error(error) })
  }
}
