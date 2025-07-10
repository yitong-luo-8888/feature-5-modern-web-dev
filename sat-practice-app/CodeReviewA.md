# Code Review A  
## Responsible: Yitong Luo  
## Reviewed by: Thomas Mitchell

---

## Responsibilities by Yitong Luo
- Built the `ProtectedRoute` component to restrict access to certain routes unless the user is authenticated.
- Integrated protected routing into `App.js`, wrapping all necessary components.
- Ensured proper redirection:
  - Unauthenticated users are sent to `/auth`.
  - Authenticated users cannot return to `/auth` (login/register).
- Utilized `checkUser()` from `AuthService.js` to verify authentication.

---

## Reviewer Comments by Thomas Mitchell

✅ ProtectedRoute is clearly structured and easy to reuse.  
✅ All critical routes (especially `/`) are appropriately protected.  
✅ Manually typing protected URLs while unauthenticated triggers correct redirection.  
✅ Good separation of concerns by relying on the AuthService for checking auth status.

🛠 Suggestion: Add comments within `App.js` to clearly denote which routes are protected vs public for maintainability.
