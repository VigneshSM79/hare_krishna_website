// Browser side of api/virage-vidya.ts.
//
// The login token and the devotee's mobile are remembered on this phone so a
// devotee can mark rounds each morning without logging in again. Storage can
// be missing (private tabs, blocked site data), so every access is guarded and
// the page simply asks again when it is.

export interface Devotee {
  name: string;
  mobile: string;
  dateOfBirth: string;
  roundTarget: number;
}

export interface ChantEntry {
  date: string;
  rounds: number;
}

export interface Profile {
  today: string;
  devotee: Devotee | null;
  entries: ChantEntry[];
}

/** Raised when the login has expired or the shared password was changed. */
export class LoggedOutError extends Error {}

const TOKEN_KEY = 'vv_token';
const MOBILE_KEY = 'vv_mobile';

export const remembered = {
  get(key: 'token' | 'mobile'): string {
    try {
      return localStorage.getItem(key === 'token' ? TOKEN_KEY : MOBILE_KEY) ?? '';
    } catch {
      return '';
    }
  },
  set(key: 'token' | 'mobile', value: string) {
    try {
      const name = key === 'token' ? TOKEN_KEY : MOBILE_KEY;
      if (value) localStorage.setItem(name, value);
      else localStorage.removeItem(name);
    } catch {
      // Not remembered — the devotee will just be asked again next visit.
    }
  },
};

async function call<T>(action: string, fields: Record<string, unknown> = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch('/api/virage-vidya', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${remembered.get('token')}`,
      },
      body: JSON.stringify({ action, ...fields }),
    });
  } catch {
    throw new Error('No internet connection. Please check your network and try again.');
  }

  const payload = (await response.json().catch(() => null)) as
    | ({ ok?: boolean; error?: string } & T)
    | null;

  if (response.status === 401) {
    remembered.set('token', '');
    throw new LoggedOutError(payload?.error ?? 'Please log in again.');
  }
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error ?? `Something went wrong (HTTP ${response.status})`);
  }
  return payload;
}

export async function logIn(email: string, password: string): Promise<void> {
  const { token } = await call<{ token: string }>('login', { email, password });
  remembered.set('token', token);
}

export const loadProfile = (mobile: string) => call<Profile>('me', { mobile });

export const register = (mobile: string, name: string, dateOfBirth: string) =>
  call<Profile>('register', { mobile, name, dateOfBirth });

export const markRounds = (mobile: string, date: string, rounds: number) =>
  call<Profile>('chant', { mobile, date, rounds });
