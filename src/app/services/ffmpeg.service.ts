import { Injectable } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isReady = false
  private ffmpeg
  
  constructor() { 
    this.ffmpeg = createFFmpeg({ log: true})
  }

  async init() {
    if(this.isReady){
      return
    }

      await this.ffmpeg.load()

    this.isReady = true
  }

  async getScreenshots (file: File) {
    const data = await fetchFile(file)

    this.ffmpeg.FS('writeFile', file.name, data)

    const seconds = [1, 2 , 3]
    const commands: string[] = []

    seconds.forEach(second => {
      commands.push (
        // Input
        '-i', file.name, // -i -> tell ffmpeg to grab a specific file from our file system
        // Output Option
        '-ss', `00:00:0${second}`, //'-ss', 'hh: mm: ss' // -ss -> allows us to configure the current timestamp by default set the timestamp the very beginning of the video
        '-frames:v', '1',
        '-filter:v', 'scale=510:-1',
        // Output'
        `output_0${second}.png`
      )
    });

    await this.ffmpeg.run(
      ...commands
    )

    const screenshots: string[] = []

    seconds.forEach(second => {
      const screenshotFile = this.ffmpeg.FS(
        'readFile',`output_0${second}.png`
      )
      const screenshotBlob = new Blob(
        [screenshotFile.buffer], {
          type: 'image/png'
        }
      )

      const screenshotURL = URL.createObjectURL(screenshotBlob)

      screenshots.push(screenshotURL)
    })

    return screenshots
  }
} 