import { isChildElement } from '../collections';

describe('Utils collections', () => {
  describe('isChildElement', () => {
    it('should return true when parent append child', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');

      parent.appendChild(child);

      const result = isChildElement(parent, child);

      expect(result).toBeTruthy();
    });

    it('should return false when no child is append', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');

      const result = isChildElement(parent, child);

      expect(result).toBeFalsy();
    });

    it('should return false when parent & child is null', () => {
      const result = isChildElement(null, null);

      expect(result).toBeFalsy();
    });
  });
});
