import { PositiveNumberValidator } from './camera.pipe';

describe('CameraIdPipe', () => {
  const validator = new PositiveNumberValidator();
  it('should throw as not correct value', () => {
    expect(() => validator.transform('-200')).toThrow();
    expect(validator.transform('200')).toBe(200);
    expect(validator.transform(',')).toEqual(undefined);
    expect(validator.transform(undefined)).toEqual(undefined);
  });
});
