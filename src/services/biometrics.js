function bytesToBase64Url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlToBytes(value) {
  const text = String(value);
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(text.length / 4) * 4, '=');
  const binary = atob(base64);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function randomChallenge(length = 32) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

async function isPlatformAuthenticatorAvailable() {
  if (!window.isSecureContext || !window.PublicKeyCredential || !navigator.credentials) return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

/**
 * Performs local platform-authenticator verification.
 * This is a device-presence gate, not server-side identity authentication.
 */
export async function verifyPlatformBiometric({ credentialId = null, userId = null } = {}) {
  if (!(await isPlatformAuthenticatorAvailable())) {
    return { ok: false, reason: 'unsupported', credentialId, userId };
  }

  try {
    let nextUserId = userId || bytesToBase64Url(randomChallenge(16));

    if (!credentialId) {
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: randomChallenge(),
          rp: { name: 'Form First' },
          user: {
            id: base64UrlToBytes(nextUserId),
            name: 'formfirst-local-user',
            displayName: 'Form First'
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -257 }
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            residentKey: 'preferred',
            userVerification: 'required'
          },
          timeout: 60_000,
          attestation: 'none'
        }
      });

      if (!credential) return { ok: false, reason: 'cancelled', credentialId, userId: nextUserId };
      return {
        ok: true,
        enrolled: true,
        credentialId: bytesToBase64Url(credential.rawId),
        userId: nextUserId
      };
    }

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: randomChallenge(),
        allowCredentials: [{
          type: 'public-key',
          id: base64UrlToBytes(credentialId),
          transports: ['internal']
        }],
        userVerification: 'required',
        timeout: 60_000
      }
    });

    return { ok: Boolean(assertion), enrolled: false, credentialId, userId: nextUserId };
  } catch (error) {
    return {
      ok: false,
      reason: error?.name === 'NotAllowedError' ? 'cancelled' : 'error',
      credentialId,
      userId
    };
  }
}
