import { Injectable } from '@nestjs/common';
import { exec } from 'child-process-async';
import { unlink, writeFileSync } from 'fs';

@Injectable()
export class VoicetotextService {
  async getTextFromAudio(file: Express.Multer.File) {
    const command = `python src/python/scripts/_whisper.py ${file.destination}/${file.filename}`;
    const { stdout, stderr } = await exec(command);
    this.removeTempFile(file.filename);
    return { result: stdout };
  }

  async getTextFromAudioBase64(data: string) {
    //Decode base 64 to wav file
    const filename = Date.now().toString() + Math.floor(Math.random() * 1000);
    writeFileSync(
      `temp/${filename}`,
      Buffer.from(
        data.replace('data:audio/wav; codecs=opus;base64,', ''),
        'base64',
      ),
    );

    const command = `python src/python/scripts/_whisper.py temp/${filename}`;
    const { stdout, stderr } = await exec(command);
    this.removeTempFile(filename);
    return { result: stdout };
  }

  removeTempFile(filename: string) {
    unlink(`temp/${filename}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
