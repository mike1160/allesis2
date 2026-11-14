# Supabase Setup voor Allesis

## Stap 1: Account aanmaken
1. Ga naar https://supabase.com
2. Klik "Start your project" → log in met GitHub
3. Klik "New project"
4. Naam: `allesis`
5. Wachtwoord: kies een sterk wachtwoord en bewaar het
6. Regio: **West EU (Ireland)**
7. Klik "Create new project"

## Stap 2: Database tabellen aanmaken
Ga naar **SQL Editor** en voer dit in:

```sql
-- Klanten profiel tabel
CREATE TABLE klanten (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  naam TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Hosting pakketten
CREATE TABLE hosting_pakketten (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  naam TEXT NOT NULL,
  prijs TEXT NOT NULL,
  status TEXT DEFAULT 'actief' CHECK (status IN ('actief', 'verlopen', 'gepauzeerd')),
  schijfruimte TEXT,
  dataverkeer TEXT,
  verloopdatum DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Domeinen
CREATE TABLE domeinen (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  naam TEXT NOT NULL,
  extensie TEXT NOT NULL,
  status TEXT DEFAULT 'actief' CHECK (status IN ('actief', 'verlopen', 'in behandeling')),
  verloopdatum DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Row Level Security) aanzetten
ALTER TABLE klanten ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosting_pakketten ENABLE ROW LEVEL SECURITY;
ALTER TABLE domeinen ENABLE ROW LEVEL SECURITY;

-- Policies: klant ziet alleen eigen data
CREATE POLICY "Klant ziet eigen profiel" ON klanten FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Klant ziet eigen pakketten" ON hosting_pakketten FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Klant ziet eigen domeinen" ON domeinen FOR ALL USING (auth.uid() = user_id);

-- Trigger: auto klant profiel aanmaken bij registratie
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.klanten (user_id, naam, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'naam', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Stap 3: API keys ophalen
Ga naar **Project Settings → API**:
- `Project URL` → dit is NEXT_PUBLIC_SUPABASE_URL
- `anon public` key → dit is NEXT_PUBLIC_SUPABASE_ANON_KEY
- `service_role` key → dit is SUPABASE_SERVICE_ROLE_KEY

## Stap 4: Vercel environment variables instellen
Ga naar Vercel → allesis2 project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
ADMIN_EMAIL=info@allesis.nl
```

Klik "Save" en dan **Redeploy** in Vercel.

## Stap 5: Auth instellingen
In Supabase → **Authentication → URL Configuration**:
- Site URL: `https://allesis2-4h7j.vercel.app` (of jouw domein)
- Redirect URLs: voeg toe `https://allesis2-4h7j.vercel.app/**`

Klaar! Ga naar /registreren om een account aan te maken.
