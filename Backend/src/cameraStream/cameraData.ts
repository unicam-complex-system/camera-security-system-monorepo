export type Camera = {
  id: number;
  name: string;
  rtspUrl: string;
};

export const cameraData: Camera[] = [
  {
    id: 1,
    name: 'Backyard',
    rtspUrl: 'rtsp://192.168.252.244:554',
  },
  /*  {
    id: 2,
    name: 'Pet room',
    rtspUrl: 'rtsp://192.168.252.244:554',
  },
  {
    id: 3,
    name: 'Main road',
    rtspUrl: 'rtsp://192.168.252.244:554',
  },
  {
    id: 4,
    name: 'Parking',
    rtspUrl: 'rtsp://192.168.252.244:554',
  },
  {
    id: 1,
    name: 'Backyard',
    rtspUrl: 'rtsp://192.168.252.244:554',
  }, */
];
