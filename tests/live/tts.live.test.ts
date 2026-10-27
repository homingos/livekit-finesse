// Runs against the Finesse API and is billed: a few short sentences.
//   FINESSE_LIVE=1 FINESSE_API_KEY=flv_... FINESSE_VOICE_ID=<voice id> pnpm test:live
import { tts as ttsTypes } from '@livekit/agents';
import { describe, expect, it } from 'vitest';
import { TTS } from '../../src/index.js';

const live = process.env.FINESSE_LIVE === '1';
const voice = process.env.FINESSE_VOICE_ID ?? '';

type Audio = AsyncIterable<
  ttsTypes.SynthesizedAudio | typeof ttsTypes.SynthesizeStream.END_OF_STREAM
>;

/** The seconds of audio in a reply, and the sample rates its frames used. */
async function collect(audio: Audio) {
  let total = 0;
  const rates = new Set<number>();
  for await (const ev of audio) {
    if (ev === ttsTypes.SynthesizeStream.END_OF_STREAM) break;
    total += ev.frame.samplesPerChannel / ev.frame.sampleRate;
    rates.add(ev.frame.sampleRate);
  }
  return { total, rates };
}

describe.runIf(live)('Finesse API', () => {
  it('synthesizes a sentence', async () => {
    const tts = new TTS({ voice });
    const { total } = await collect(tts.synthesize('Hello from the Finesse plugin.'));
    expect(total).toBeGreaterThan(0.5);
    await tts.close();
  }, 60_000);

  it('streams text as it arrives, then a second reply on the same connection', async () => {
    const tts = new TTS({ voice });
    for (const text of ['This reply arrives a few words at a time.', 'And this is the next one.']) {
      const stream = tts.stream();
      for (const word of text.split(' ')) stream.pushText(word + ' ');
      stream.endInput();
      expect((await collect(stream)).total).toBeGreaterThan(0.5);
    }
    await tts.close();
  }, 60_000);

  it('speaks Hindi as 8 kHz telephony audio', async () => {
    const tts = new TTS({ voice, language: 'hi', sampleRate: 8000 });
    const { total, rates } = await collect(tts.synthesize('नमस्ते, आप कैसे हैं?'));
    expect(total).toBeGreaterThan(0.5);
    expect([...rates]).toEqual([8000]);
    await tts.close();
  }, 60_000);
});
