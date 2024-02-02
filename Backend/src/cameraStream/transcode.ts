import { spawn, exec } from 'child_process';

export const transcode = (
  camera: { id: string; rtspUri: string },
  socket: any,
) => {
  let trialCount = 0;
  let active = true;
  const workingDirectory = {
    cwd: `./static/stream/cam${camera.id}`,
  };

  const performTranscoding = () => {
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
      '3',
      '-hls_flags',
      'delete_segments',
      '-start_number',
      '1',
      'index.m3u8',
    ];

    const childProcess = spawn('ffmpeg', ffmpegOptions, workingDirectory);

    childProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      active = true;
      trialCount = 0;
    });

    childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      active = true;
    });

    childProcess.on('close', (code) => {
      active = false;
      console.log(`child process exited with code ${code}`);
      exec('rm *', workingDirectory, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    });
  };

  performTranscoding();

  // Check inactivity every five second
  const interval = setInterval(() => {
    if (!active) {
      trialCount = trialCount + 1;
      if (trialCount > 10) {
        socket
          .to('clients')
          .emit('inactive', JSON.stringify({ id: camera.id }));
      }

      performTranscoding();
    } else if (active) {
      socket.to('clients').emit('active', JSON.stringify({ id: camera.id }));
    }
  }, 5000);
};
