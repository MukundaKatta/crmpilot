-- CRMPilot Database Schema
CREATE TABLE IF NOT EXISTS profiles (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, full_name TEXT, role TEXT, team TEXT, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS contacts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, email TEXT, phone TEXT, company TEXT, role TEXT, lead_score INTEGER DEFAULT 0, status TEXT DEFAULT 'lead', tags TEXT[] DEFAULT '{}', deal_value DECIMAL DEFAULT 0, last_contact_at TIMESTAMPTZ, metadata JSONB DEFAULT '{}', user_id UUID REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS deals (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, contact_id UUID REFERENCES contacts(id), company TEXT, value DECIMAL NOT NULL DEFAULT 0, stage TEXT DEFAULT 'discovery', probability INTEGER DEFAULT 0, close_date DATE, owner_id UUID REFERENCES profiles(id), ai_insight TEXT, notes TEXT, metadata JSONB DEFAULT '{}', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS activities (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), type TEXT NOT NULL, subject TEXT, description TEXT, contact_id UUID REFERENCES contacts(id), deal_id UUID REFERENCES deals(id), user_id UUID REFERENCES profiles(id), scheduled_at TIMESTAMPTZ, completed_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS emails (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), contact_id UUID REFERENCES contacts(id), subject TEXT, body TEXT, direction TEXT DEFAULT 'outbound', status TEXT DEFAULT 'sent', opened_at TIMESTAMPTZ, replied_at TIMESTAMPTZ, user_id UUID REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS dashboards (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, widgets JSONB DEFAULT '[]', user_id UUID REFERENCES profiles(id), created_at TIMESTAMPTZ DEFAULT NOW());

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own data" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users manage contacts" ON contacts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage deals" ON deals FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Users manage activities" ON activities FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage emails" ON emails FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage dashboards" ON dashboards FOR ALL USING (auth.uid() = user_id);
