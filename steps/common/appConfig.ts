import dotenv from 'dotenv'
import { error } from 'node:console'

dotenv.config()

const config = {
  HMPPS_CUSTODY_AUTH_USERNAME: process.env.HMPPS_CUSTODY_AUTH_USERNAME || null,
  HMPPS_CUSTODY_AUTH_PASSWORD: process.env.HMPPS_CUSTODY_AUTH_PASSWORD,
  HMPPS_COMMUNITY_AUTH_USERNAME: process.env.HMPPS_COMMUNITY_AUTH_USERNAME,
  HMPPS_COMMUNITY_AUTH_PASSWORD: process.env.HMPPS_COMMUNITY_AUTH_PASSWORD,
  HMPPS_UNAUTHORISED_AUTH_USERNAME: process.env.HMPPS_UNAUTHORISED_AUTH_USERNAME,
  HMPPS_UNAUTHORISED_AUTH_PASSWORD: process.env.HMPPS_UNAUTHORISED_AUTH_PASSWORD,
  FIND_AND_REFER_URL: process.env.FIND_AND_REFER_URL,
}

export function getConfig(): AppConfig {
  const missingEnvs: string[] = []
  Object.entries(config).forEach(([prop, value]) => {
    if (value == null || value === '') {
      missingEnvs.push(`property ${prop}`)
    }
  })
  if (missingEnvs.length > 0) {
    throw error`Missing required environment variables: ${missingEnvs.join(',\n')}`
  }
  return config as AppConfig
}

export type AppConfig = {
  HMPPS_CUSTODY_AUTH_USERNAME: string
  HMPPS_CUSTODY_AUTH_PASSWORD: string
  HMPPS_COMMUNITY_AUTH_USERNAME: string
  HMPPS_COMMUNITY_AUTH_PASSWORD: string
  HMPPS_UNAUTHORISED_AUTH_USERNAME: string
  HMPPS_UNAUTHORISED_AUTH_PASSWORD: string
  FIND_AND_REFER_URL: string
}

export default getConfig
