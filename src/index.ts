import { Plugin } from '@livekit/agents';
import { VERSION } from './version.js';

export * from './tts.js';
export { VERSION } from './version.js';

class FinessePlugin extends Plugin {
  constructor() {
    super({ title: 'finesse', version: VERSION, package: '@flamai/livekit-plugin-finesse' });
  }
}

Plugin.registerPlugin(new FinessePlugin());
