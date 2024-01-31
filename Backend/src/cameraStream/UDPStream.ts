const { spawn } = require('child_process');

const UDPStream = (socket) => {
  // Spawn FFmpeg process to convert RTSP to WebSocket
  const ffmpeg = spawn('ffmpeg', [
    '-i',
    'rtsp://192.168.155.244:554',
    '-c:v',
    'copy',
    '-c:a',
    '-hls_time',
    '2',
    '-hls_list_size',
    '10',
    '-hls_flags',
    'delete_segments',
    '-start_number',
    '1',
    'output.m3u8',
  ]);

  // Handle WebSocket closure
  socket.on('close', () => {
    ffmpeg.kill('SIGKILL');
  });
};
