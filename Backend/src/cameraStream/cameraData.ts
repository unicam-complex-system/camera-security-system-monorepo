export type Camera = {
  id: string;
  name: string;
  rtspUrl: string;
  ip: string;
  port: string;
};

export const cameraData: Camera[] = [
  {
    id: '1',
    name: 'Mainroad',
    rtspUrl: 'rtsp://192.168.129.244:554',
    ip: '192.168.129.244',
    port: '554',
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
