/**
 * Checks if a given string is a valid email address.
 *
 * @param email - The string to check.
 *
 * @returns True if the string is a valid email address, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

/**
 * Counts the number of characters in the input string.
 *
 * @param value - The string to count.
 *
 * @returns The number of characters in the string.
 *
 * @remarks
 * Newlines and surrogate pairs are counted as a single character.
 */
export function count(value: string): number {
  if (!value) return 0;

  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });

  return [...segmenter.segment(value)].length;
}
