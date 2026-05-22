// Intentionally renders nothing. The PhoneFrame already binds the ESC key
// globally to navigate back to /, so the visible "esc" pill is redundant.
// Kept exporting the component so existing screens don't need to be edited.
export function ScreenBack(_props: { to?: string }) {
  return null;
}
