import { cameraIds, PositiveNumberValidator } from './camera.pipe';

describe('CameraIdPipe', () => {
  const validator = new PositiveNumberValidator();
  it('should throw as not correct value', () => {
    expect(() => validator.transform('200')).toThrow();
  });

  it('should accept all the values', () => {
    cameraIds.forEach((i) => expect(validator.transform(`${i}`)).toBe(i));
  });
});
