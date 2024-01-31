import { spawn } from 'child_process';

export const transcode = (cameras: { id: string; rtspUri: string }[]) => {
  cameras.forEach((camera) => {
    const ffmpegOptions = [
      '-i',
      camera.rtspUri,
      '-c:v',
      'copy',
      '-c:a',
      'copy',
      '-hls_time',
      '2',
      '-hls_list_size',
      '10',
      '-hls_flags',
      'delete_segments',
      '-start_number',
      '1',
      'index.m3u8',
    ];

    const workingDirectory = {
      cwd: `./static/stream/cam${camera.id}`, // Replace with the desired directory path
    };

    const childProcess = spawn('ffmpeg', ffmpegOptions, workingDirectory);

    childProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    childProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
};
