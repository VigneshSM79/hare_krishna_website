import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, LogOut, Minus, Plus } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import {
  ChantEntry,
  LoggedOutError,
  Profile,
  loadProfile,
  logIn,
  markRounds,
  register,
  remembered,
} from '../lib/virageVidya';

// Virage Vidya — the devotees' private daily chanting log.
//
// login → mobile → (register, first visit only) → home
//
// Everyone shares one login; the mobile number is what tells devotees apart.
// A day with no entry is shown as "not marked", never as 0 — the temple wants
// "did not report" kept apart from "chanted 0", as in their Excel tracker.

type Screen = 'loading' | 'login' | 'mobile' | 'register' | 'home';

const inputClasses =
  'w-full px-4 py-3 rounded-sm border border-line bg-paper focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition';

/** How many past days a devotee can still fill in — matches the server. */
const BACKFILL_DAYS = 6;

// Dates travel as "2026-09-24". Doing the arithmetic in UTC keeps a phone's
// time zone from shifting a day.
function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function dayLabel(iso: string, today: string): string {
  if (iso === today) return 'Today';
  if (iso === addDays(today, -1)) return 'Yesterday';
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** The Monday-to-Sunday week that contains `today`. */
function weekOf(today: string): string[] {
  const weekday = new Date(`${today}T00:00:00Z`).getUTCDay(); // 0 = Sunday
  const monday = addDays(today, -((weekday + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

const VirageVidya = () => {
  const [screen, setScreen] = useState<Screen>('loading');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState(remembered.get('mobile'));
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [day, setDay] = useState('');
  const [rounds, setRounds] = useState('');
  const [saved, setSaved] = useState(false);

  /** Runs a server call, handling the busy flag, errors and expired logins. */
  const run = async (task: () => Promise<void>) => {
    setBusy(true);
    setError('');
    try {
      await task();
    } catch (err) {
      if (err instanceof LoggedOutError) setScreen('login');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const showProfile = (next: Profile) => {
    setProfile(next);
    if (!next.devotee) {
      setScreen('register');
      return;
    }
    remembered.set('mobile', next.devotee.mobile);
    setScreen('home');
  };

  // Returning devotee on the same phone: straight to their page.
  useEffect(() => {
    const knownMobile = remembered.get('mobile');
    if (!remembered.get('token')) {
      setScreen('login');
    } else if (!knownMobile) {
      setScreen('mobile');
    } else {
      run(async () => showProfile(await loadProfile(knownMobile))).then(() =>
        setScreen(current => (current === 'loading' ? 'mobile' : current))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever the chosen day (or the saved data) changes, show what was already
  // saved for that day.
  const entryFor = (date: string): ChantEntry | undefined =>
    profile?.entries.find(entry => entry.date === date);

  useEffect(() => {
    if (!profile) return;
    const chosen = day || profile.today;
    if (!day) setDay(chosen);
    const existing = entryFor(chosen);
    setRounds(existing ? String(existing.rounds) : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, profile]);

  const chooseDay = (date: string) => {
    setDay(date);
    setSaved(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      await logIn(email.trim(), password);
      setPassword('');
      const knownMobile = remembered.get('mobile');
      if (knownMobile) showProfile(await loadProfile(knownMobile));
      else setScreen('mobile');
    });
  };

  const handleMobile = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => showProfile(await loadProfile(mobile)));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => showProfile(await register(mobile, name.trim(), dateOfBirth)));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.devotee || rounds === '') {
      setError('Please enter how many rounds you chanted.');
      return;
    }
    const devoteeMobile = profile.devotee.mobile;
    setSaved(false);
    run(async () => {
      showProfile(await markRounds(devoteeMobile, day, Number(rounds)));
      setSaved(true);
    });
  };

  const switchDevotee = () => {
    remembered.set('mobile', '');
    setProfile(null);
    setMobile('');
    setDay('');
    setError('');
    setScreen('mobile');
  };

  const logOut = () => {
    remembered.set('token', '');
    remembered.set('mobile', '');
    setProfile(null);
    setMobile('');
    setDay('');
    setError('');
    setScreen('login');
  };

  const nudge = (by: number) =>
    setRounds(current => String(Math.max(0, Math.min(200, (Number(current) || 0) + by))));

  const errorBox = error && (
    <p className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</p>
  );

  const submitButton = (label: string) => (
    <button
      type="submit"
      disabled={busy}
      className="btn-primary w-full py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed gap-2"
    >
      {busy && <Loader2 size={22} className="animate-spin" />}
      <span>{busy ? 'Please wait...' : label}</span>
    </button>
  );

  const renderScreen = () => {
    if (screen === 'loading') {
      return (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-saffron" size={32} />
        </div>
      );
    }

    if (screen === 'login') {
      return (
        <form onSubmit={handleLogin} className="bg-paper-2 border border-line rounded-md p-8 space-y-5">
          <h2 className="font-display font-medium text-2xl text-ink">Log in</h2>
          <p className="text-stone">Use the email and password shared by the temple.</p>
          <div>
            <label htmlFor="vv-email" className="block text-sm font-medium text-ink mb-1">Email</label>
            <input id="vv-email" type="email" autoComplete="username" required value={email}
              onChange={e => setEmail(e.target.value)} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="vv-password" className="block text-sm font-medium text-ink mb-1">Password</label>
            <input id="vv-password" type="password" autoComplete="current-password" required value={password}
              onChange={e => setPassword(e.target.value)} className={inputClasses} />
          </div>
          {errorBox}
          {submitButton('Log in')}
        </form>
      );
    }

    if (screen === 'mobile') {
      return (
        <form onSubmit={handleMobile} className="bg-paper-2 border border-line rounded-md p-8 space-y-5">
          <h2 className="font-display font-medium text-2xl text-ink">Who is chanting?</h2>
          <p className="text-stone">Enter your mobile number. First time here? We will make your profile next.</p>
          <div>
            <label htmlFor="vv-mobile" className="block text-sm font-medium text-ink mb-1">Mobile Number</label>
            <input id="vv-mobile" type="tel" inputMode="numeric" autoComplete="tel" required value={mobile}
              onChange={e => setMobile(e.target.value)} placeholder="98765 43210" className={inputClasses} />
          </div>
          {errorBox}
          {submitButton('Continue')}
        </form>
      );
    }

    if (screen === 'register') {
      return (
        <form onSubmit={handleRegister} className="bg-paper-2 border border-line rounded-md p-8 space-y-5">
          <h2 className="font-display font-medium text-2xl text-ink">Create your profile</h2>
          <p className="text-stone">We could not find <strong className="text-ink">{mobile}</strong>. Tell us a little about you.</p>
          <div>
            <label htmlFor="vv-name" className="block text-sm font-medium text-ink mb-1">
              Full Name <span className="text-saffron">*</span>
            </label>
            <input id="vv-name" type="text" autoComplete="name" required maxLength={100} value={name}
              onChange={e => setName(e.target.value)} placeholder="e.g. Sudha Mataji" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="vv-dob" className="block text-sm font-medium text-ink mb-1">
              Date of Birth <span className="text-saffron">*</span>
            </label>
            <input id="vv-dob" type="date" required value={dateOfBirth} max={profile?.today}
              onChange={e => setDateOfBirth(e.target.value)} className={inputClasses} />
          </div>
          {errorBox}
          {submitButton('Create profile')}
          <button type="button" onClick={switchDevotee} className="link-underline text-sm">
            Wrong number? Go back
          </button>
        </form>
      );
    }

    // Home
    if (!profile?.devotee) return null;
    const { devotee, today, entries } = profile;
    const choosableDays = Array.from({ length: BACKFILL_DAYS + 1 }, (_, i) => addDays(today, -i));
    const week = weekOf(today);
    const weekTotal = week.reduce((sum, date) => sum + (entryFor(date)?.rounds ?? 0), 0);
    const month = entries.filter(entry => entry.date.slice(0, 7) === today.slice(0, 7));
    const monthTotal = month.reduce((sum, entry) => sum + entry.rounds, 0);
    const monthTargetDays = month.filter(entry => entry.rounds >= devotee.roundTarget).length;
    const alreadyMarked = entryFor(day);

    return (
      <div className="space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Hare Krishna</p>
            <h2 className="font-display font-medium text-3xl text-ink">{devotee.name}</h2>
            <button type="button" onClick={switchDevotee} className="link-underline text-sm text-stone mt-1">
              Not you? Switch devotee
            </button>
          </div>
          <button type="button" onClick={logOut} className="inline-flex items-center gap-1 text-sm text-stone hover:text-ink">
            <LogOut size={16} /> Log out
          </button>
        </div>

        {/* Mark rounds */}
        <form onSubmit={handleSave} className="bg-paper-2 border border-line rounded-md p-6 sm:p-8 space-y-5">
          <h3 className="font-display font-medium text-xl text-ink">Mark your rounds</h3>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Day">
            {choosableDays.map(date => (
              <button key={date} type="button" onClick={() => chooseDay(date)} aria-pressed={date === day}
                className={`px-3 py-2 rounded-sm border text-sm transition-colors ${
                  date === day ? 'bg-ink text-paper border-ink' : 'bg-paper text-ink border-line hover:border-stone'
                }`}>
                {dayLabel(date, today)}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="vv-rounds" className="block text-sm font-medium text-ink mb-1">
              Rounds chanted <span className="text-stone font-normal">(your target is {devotee.roundTarget})</span>
            </label>
            <div className="flex items-stretch gap-2">
              <button type="button" onClick={() => nudge(-1)} aria-label="One less round"
                className="px-4 border border-line rounded-sm bg-paper text-ink hover:border-stone">
                <Minus size={18} />
              </button>
              <input id="vv-rounds" type="number" inputMode="numeric" min={0} max={200} step={1} value={rounds}
                onChange={e => setRounds(e.target.value)} placeholder="0"
                className={`${inputClasses} text-center text-2xl font-display`} />
              <button type="button" onClick={() => nudge(1)} aria-label="One more round"
                className="px-4 border border-line rounded-sm bg-paper text-ink hover:border-stone">
                <Plus size={18} />
              </button>
            </div>
            <p className="text-sm text-stone mt-2">
              {alreadyMarked
                ? `Already marked ${alreadyMarked.rounds} for ${dayLabel(day, today).toLowerCase()}. Saving again will correct it.`
                : `Not marked yet for ${dayLabel(day, today).toLowerCase()}.`}
            </p>
          </div>

          {saved && !error && (
            <p className="flex items-center gap-2 text-peacock text-sm font-medium">
              <CheckCircle size={18} /> Saved. Hare Krishna!
            </p>
          )}
          {errorBox}
          {submitButton('Save rounds')}
        </form>

        {/* This week */}
        <section className="border border-line rounded-md p-6 sm:p-8">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display font-medium text-xl text-ink">This week</h3>
            <p className="text-stone text-sm">{weekTotal} rounds</p>
          </div>
          <ul className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {week.map(date => {
              const entry = entryFor(date);
              const future = date > today;
              const metTarget = entry && entry.rounds >= devotee.roundTarget;
              return (
                <li key={date} className={`rounded-sm border py-2 ${
                  metTarget ? 'border-peacock bg-peacock/10' : 'border-line'
                }`}>
                  <span className="block text-xs text-stone">
                    {new Date(`${date}T00:00:00Z`).toLocaleDateString('en-IN', { weekday: 'narrow', timeZone: 'UTC' })}
                  </span>
                  <span className={`block font-display text-lg ${entry ? 'text-ink' : 'text-stone'}`}
                    title={entry ? undefined : future ? 'Coming up' : 'Not marked'}>
                    {entry ? entry.rounds : future ? '' : '—'}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-stone mt-3">— means not marked yet. Green means the target was reached.</p>
        </section>

        {/* This month */}
        <section className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          {[
            { value: monthTotal, label: 'rounds this month' },
            { value: month.length, label: 'days marked' },
            { value: monthTargetDays, label: `days of ${devotee.roundTarget}+` },
          ].map(stat => (
            <div key={stat.label} className="border border-line rounded-md py-4 px-2">
              <p className="font-display text-3xl text-ink">{stat.value}</p>
              <p className="text-xs text-stone mt-1">{stat.label}</p>
            </div>
          ))}
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <section className="pt-[calc(var(--header-h)+48px)] pb-10 bg-paper-2">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <p className="eyebrow mb-3">For devotees</p>
            <h1 className="font-display font-medium text-4xl text-ink">Virage Vidya</h1>
            <p className="text-stone mt-3">Your daily chanting, kept in one place.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-xl">{renderScreen()}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VirageVidya;
