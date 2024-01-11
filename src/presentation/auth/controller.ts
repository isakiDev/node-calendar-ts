import { type Request, type Response } from 'express'
import { LoginUserDto, type AuthRepository, LoginUser, RegisterUserDto, RegisterUser, CustomError, RevalidateTokenDto, RevalidateToken } from '../../domain'

type RequestWithIdAndName = Request & RevalidateTokenDto

export class AuthController {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  private handleError (error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  login = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  register = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  revalidateToken = async (req: RequestWithIdAndName, res: Response) => {
    const [error, revalidateTokenDto] = RevalidateTokenDto.create({
      id: req.id,
      name: req.name
    })

    if (error) return res.status(400).json({ error })

    new RevalidateToken(this.authRepository)
      .execute(revalidateTokenDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
