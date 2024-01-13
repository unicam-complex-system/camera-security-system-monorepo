/* eslint-disable padded-blocks */
import type { Camera } from './cameraData';
import { cameraData } from './cameraData';
const { spawn } = require('child_process');
const fs = require('fs');

function createDirectory(directoryPath) {
  // Check if the directory already exists
  fs.access(directoryPath, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log(
        `Directory '${directoryPath}' already exists. No action taken.`,
      );
      return;
    }

    // If the directory does not exist, create it
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
        return;
      }

      console.log(`Directory '${directoryPath}' created successfully.`);
    });
  });
}

function transcodeRTSPtoHLS(camera: Camera) {
  //Create stream directory and then run FFmpeg command

  createDirectory(
    `${__dirname}\\..\\${process.env.HLS_OUTPUT_DIRECTORY}\\${camera.id}`,
  );

  const ffmpegCommand = [
    '-rtsp_transport',
    'udp',
    '-i',
    camera.rtspUrl,
    '-c:v',
    'libx264',
    '-c:a',
    'aac',
    '-b:a',
    '128000',
    '-g',
    '2',
    '-keyint_min',
    '2',
    '-ac',
    '2',
    '-s',
    '854x480',
    '-b:v',
    '800000',
    '-hls_time',
    '2',
    '-hls_list_size',
    '10',
    '-start_number',
    '1',
    '-hls_flags',
    'delete_segments',
    '-preset',
    'ultrafast',
    `${__dirname}\\..\\${process.env.HLS_OUTPUT_DIRECTORY}\\${camera.id}\\${camera.id}_${process.env.HLS_FILE_NAME}`,
  ];

  // Spawn FFmpeg process
  const ffmpegProcess = spawn('ffmpeg', ffmpegCommand);

  // Event listeners for process output
  ffmpegProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ffmpegProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ffmpegProcess.on('close', (code) => {
    console.log(`FFmpeg process closed with code ${code}`);
  });

  ffmpegProcess.on('error', (err) => {
    console.error(`Error executing FFmpeg: ${err}`);
  });
}

// Periodically check the RTSP streams and restart transcoding for each
function periodicCheck() {
  console.log('Checking RTSP stream status...');
  cameraData.forEach(transcodeRTSPtoHLS);
}

// Run once the application is run
export function initiateCameraStream() {
  // Run the periodic check every 10 minutes (adjust as needed)
  setInterval(periodicCheck, 10 * 60 * 1000);

  // Initial transcoding for each RTSP stream
  cameraData.forEach(transcodeRTSPtoHLS);
}
