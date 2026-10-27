// A voice agent that speaks with Finesse. Speech-to-text and the LLM run on LiveKit Inference.
//
//   export LIVEKIT_URL=... LIVEKIT_API_KEY=... LIVEKIT_API_SECRET=...
//   export FINESSE_API_KEY=flv_... FINESSE_VOICE_ID=<voice id>
//   pnpm tsx examples/agent.ts dev
import {
  type JobContext,
  ServerOptions,
  cli,
  defineAgent,
  inference,
  voice,
} from '@livekit/agents';
import { fileURLToPath } from 'node:url';
import * as finesse from '../src/index.js';

export default defineAgent({
  entry: async (ctx: JobContext) => {
    const session = new voice.AgentSession({
      stt: new inference.STT({ model: 'deepgram/nova-3', language: 'en' }),
      llm: new inference.LLM({ model: 'openai/gpt-4.1-mini' }),
      tts: new finesse.TTS({ voice: process.env.FINESSE_VOICE_ID!, language: 'en' }),
    });

    await session.start({
      agent: new voice.Agent({
        instructions: 'You are a friendly voice assistant. Keep your replies short.',
      }),
      room: ctx.room,
    });
    await ctx.connect();
    session.generateReply({ instructions: 'Greet the user and offer your help.' });
  },
});

cli.runApp(new ServerOptions({ agent: fileURLToPath(import.meta.url) }));
