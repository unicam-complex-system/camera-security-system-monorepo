import { spawn, exec } from 'child_process';

export const transcode = async (
  camera: { id: string; rtspUri: string },
  socket: any,
) => {
  let trialCount = 0;
  let active = false;
  const workingDirectory = {
    cwd: `./static/stream/cam${camera.id}`,
  };

  const notifiyActive = async (active: boolean) => {
    const timeout = setTimeout(() => {
      if (active) {
        socket.to('clients').emit('active', JSON.stringify({ id: camera.id }));
      } else {
        socket
          .to('clients')
          .emit('inactive', JSON.stringify({ id: camera.id }));
      }
    }, 15000);
  };

  const performTranscoding = async () => {
      const ffmpegOptions = [
        '-i',
        camera.rtspUri,
        '-c:v',
        'libx264',
        '-crf',
        '23',
        '-preset',
        'ultrafast',
        '-an',
        '-force_key_frames',
        'expr:gte(t,n_forced*4)',
        '-hls_time',
        '2',
        '-hls_list_size',
        '5',
        '-hls_flags',
        'delete_segments',
        '-start_number',
        '1',
        'index.m3u8',
      ];

    const childProcess = spawn('ffmpeg', ffmpegOptions, workingDirectory);

    childProcess.stderr.on('data', (data) => {
      if (data?.includes('frame=') || data?.includes('[hls')) {
        active = true;
        trialCount = 0;
      }
      console.log(data.toString());
    });

    childProcess.on('close', (code) => {
      active = false;
      console.log(`closed and removed`);
      console.log(camera.rtspUri);
      exec('rm -f *', workingDirectory, (error, stdout, stderr) => {
        if (error) {
          console.error(`Clearning folder cam${camera.id} error`);
        }
        console.log(`Clearning folder cam${camera.id} successful`);
      });
    });
  };

  performTranscoding();

  // Check inactivity every five second
  const interval = setInterval(() => {
    if (!active) {
      notifiyActive(false);
      performTranscoding();
    } else if (active) {
      notifiyActive(true);
    }
  }, 5000);
};
