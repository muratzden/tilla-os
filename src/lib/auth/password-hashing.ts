import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(
  password: string,
  storedPassword: string,
): boolean {
  if (!storedPassword) {
    return false;
  }

  const parts = storedPassword.split(":");

  if (parts.length !== 3) {
    return false;
  }

  const [algorithm, salt, storedHash] = parts;

  if (algorithm !== "scrypt") {
    return false;
  }

  const hashBuffer = Buffer.from(
    scryptSync(password, salt, KEY_LENGTH).toString("hex"),
    "hex",
  );

  const storedHashBuffer = Buffer.from(storedHash, "hex");

  if (hashBuffer.length !== storedHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashBuffer, storedHashBuffer);
}

export function isPasswordHashed(password: string): boolean {
  return password.startsWith("scrypt:");
}
