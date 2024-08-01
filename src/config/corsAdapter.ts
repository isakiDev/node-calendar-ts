import cors from 'cors'

const ACCEPTED_ORIGINS = ['https://isakidev-calendar.netlify.app', 'http://isakidev-calendar.netlify.app']

export const corsAdapter = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptedOrigins?.includes(origin)) { callback(null, true); return }
    callback(new Error('Not allowed by Cors'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
