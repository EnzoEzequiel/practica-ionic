import { Injectable } from '@angular/core';
import { supabase } from './supabaseClient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  getUser() {
    return supabase.auth.getUser();
  }
}
