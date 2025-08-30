import { count, isValidEmail } from './string';

describe('string.ts', () => {
  describe(isValidEmail.name, () => {
    test(`${isValidEmail.name}('john.doe@example.com') is valid`, () => {
      expect(isValidEmail('john.doe@example.com')).toBeTruthy();
    });

    test(`${isValidEmail.name}('john_doe@example.com') is valid`, () => {
      expect(isValidEmail('john_doe@email.com')).toBeTruthy();
    });

    test(`${isValidEmail.name}('john-doe@example.com') is valid`, () => {
      expect(isValidEmail('john-doe@email.com')).toBeTruthy();
    });

    // cSpell:disable
    test(`${isValidEmail.name}('ｊｏｈｎ＠ｅｘａｍｐｌｅ．ｃｏｍ') is invalid`, () => {
      expect(isValidEmail('ｊｏｈｎ＠ｅｘａｍｐｌｅ．ｃｏｍ')).toBeFalsy();
    });
    // cSpell:enable

    test(`${isValidEmail.name}('john.example.com') is invalid`, () => {
      expect(isValidEmail('john.example.com')).toBeFalsy();
    });

    test(`${isValidEmail.name}('john@example.') is invalid`, () => {
      expect(isValidEmail('john@example.')).toBeFalsy();
    });

    test(`${isValidEmail.name}('') is invalid`, () => {
      expect(isValidEmail('')).toBeFalsy();
    });
  });

  describe(count.name, () => {
    test(`${count.name}('hello, world!') === 13`, () => {
      expect(count('hello, world!')).toBe(13);
    });

    test(`${count.name}('Always問題ない') === 10`, () => {
      expect(count('Always問題ない')).toBe(10);
    });

    test(`${count.name}('こんにちは！\nさようなら！') === 13`, () => {
      expect(count('こんにちは！\nさようなら！')).toBe(13);
    });

    test(`${count.name}('🍎は赤い') === 4`, () => {
      expect(count('🍎は赤い')).toBe(4);
    });

    test(`${count.name}("let's dance 👯‍♀️") === 13`, () => {
      expect(count("let's dance 👯‍♀️")).toBe(13);
    });

    test(`${count.name}('') === 0`, () => {
      expect(count('')).toBe(0);
    });
  });
});
