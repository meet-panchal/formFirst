export function softHaptic(pattern = 12) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Haptics are optional progressive enhancement.
  }
}
