import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

/**
 * PRODUCTION-GRADE SHIVAI IDENTITY SDK
 * Version: 2.0.5-FINAL
 */

export interface ShivAIProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  dob?: string;
  country?: string;
  identity_strength: number;
  trust_score: number;
  behavior_score: number;
  status: 'active' | 'suspended' | 'lockdown';
  is_verified: boolean;
  metadata: Record<string, any>;
}

export interface ShivAIUser extends User, ShivAIProfile {}

export class ShivAISDK {
  private static instance: ShivAISDK;
  public supabase: SupabaseClient;

  private constructor(url: string, key: string) {
    this.supabase = createClient(url, key);
  }

  public static getInstance(url: string, key: string): ShivAISDK {
    if (!ShivAISDK.instance) {
      ShivAISDK.instance = new ShivAISDK(url, key);
    }
    return ShivAISDK.instance;
  }

  // CORE AUTH
  async login(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async logout() {
    await this.supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async getProfile(userId: string): Promise<ShivAIProfile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) return null;
    return data as ShivAIProfile;
  }

  onAuthStateChange(callback: (session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
}
