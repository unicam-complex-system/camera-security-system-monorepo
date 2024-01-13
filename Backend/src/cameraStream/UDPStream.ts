/* eslint-disable padded-blocks */
import { Server } from 'socket.io';
import type { Camera } from './cameraData';
import { cameraData } from './cameraData';
const { spawn } = require('child_process');
const fs = require('fs');

function encodeRTSPtoMpegts(camera: Camera, serverSocketInstance: Server) {
  const ffmpegCommand = [
    '-rtsp_transport',
    'udp',
    '-i',
    camera.rtspUrl,
    '-c:v',
    'copy',
    '-an',
    '-f',
    'mpegts',
    '-',
  ];

  // Spawn FFmpeg process
  const ffmpegProcess = spawn('ffmpeg', ffmpegCommand);

  // Event listeners for process output
  ffmpegProcess.stdout.on('data', (data) => {
    console.log(`streaming`);
    serverSocketInstance.to('clients').emit('stream', { id: camera.id, data });
  });

  ffmpegProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ffmpegProcess.on('close', (code) => {
    console.log(`FFmpeg process closed with code ${code}`);
    encodeRTSPtoMpegts(camera, serverSocketInstance);
  });

  ffmpegProcess.on('error', (err) => {
    console.error(`Error executing FFmpeg: ${err}`);
  });
}

// Periodically check the RTSP streams and restart transcoding for each
function periodicCheck(serverSocketInstance: Server) {
  console.log('Checking RTSP stream status...');
  cameraData.forEach((camera) =>
    encodeRTSPtoMpegts(camera, serverSocketInstance),
  );
}

// Run once the application is run
export function initiateCameraStream(serverSocketInstance: Server) {
  // Run the periodic check every 10 minutes (adjust as needed)
  setInterval(() => periodicCheck(serverSocketInstance), 10 * 60 * 1000);

  // Initial transcoding for each RTSP stream
  cameraData.forEach((camera) =>
    encodeRTSPtoMpegts(camera, serverSocketInstance),
  );
}
