import { helper } from '@ember/component/helper';

export function isValidEmail([email]) {
  if (!email) return false;
  if (!email.includes('@')) return false;
  
  const index = email.indexOf('@');
  const localpart = email.substring(0, index);
  const domain = email.substring(index + 1);

  // Simple validation - could be enhanced
  return localpart.length > 0 && domain.includes('.');
}

export default helper(isValidEmail);