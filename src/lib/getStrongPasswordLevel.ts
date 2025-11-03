export function getStrongPasswordLevel(pass: string): number {
  let strongLevel = 0;

  if (pass.length >= 8) strongLevel++;
  if (/^(?=.*[a-z]).*$/.test(pass)) strongLevel++;
  if (/^(?=.*[A-Z]).*$/.test(pass)) strongLevel++;
  if (/^(?=.*\d).*$/.test(pass)) strongLevel++;
  if (/^(?=.*[\W_]).*$/.test(pass)) strongLevel++;

  return strongLevel;
}
