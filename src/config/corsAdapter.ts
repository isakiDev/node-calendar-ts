import cors from 'cors'

const ACCEPTED_ORIGINS = ['']

export const corsAdapter = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptedOrigins?.includes(origin)) { callback(null, true); return }
    callback(new Error('Not allowed by Cors'))
  }
})
