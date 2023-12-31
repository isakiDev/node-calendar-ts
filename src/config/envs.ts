import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DB_CNN: get('DB_CNN').required().asString()
}
