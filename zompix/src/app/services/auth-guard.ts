import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { supabase } from './supabaseClient';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  return supabase.auth.getSession().then((result: any) => {
    if (result.data?.session) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  });
};
