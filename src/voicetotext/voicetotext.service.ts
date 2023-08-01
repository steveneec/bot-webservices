import { Injectable } from '@nestjs/common';
import { exec } from 'child-process-async';
import { unlink } from 'fs';

@Injectable()
export class VoicetotextService {
  async getTextFromAudio(file: Express.Multer.File) {
    const command = `python3 src/python/scripts/whisper.py ${file.destination}/${file.filename}`;
    const { stdout, stderr } = await exec(command);
    if (stdout || stderr) {
      //remove temp audio
      unlink(`${file.destination}/${file.filename}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return { result: stdout };
  }
}
