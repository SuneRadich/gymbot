// Require the necessary discord.js classes
import { Client } from 'discord.js'
import { IntentOptions } from './config/IntentOptions'
import { connectDatabase } from './database/connectDatabase'
import { validateEnv } from './utils/validateEnv'

;(async () => {
  if (!validateEnv()) return

  // Create a new client instance
  const client = new Client({ intents: IntentOptions })

  // When the client is ready, run this code (only once)
  client.once('ready', () => {
    console.log('Ready!')
  })

  await connectDatabase()
  client.login(process.env.DISCORD_TOKEN)
})()
