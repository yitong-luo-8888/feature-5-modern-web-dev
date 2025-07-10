# Code Review B  
## Responsible: Thomas Mitchell  
## Reviewed by: Yitong Luo

---

## Responsibilities by Thomas Mitchell
- Implemented `ParseConfig.js` with Back4App credentials.
- Created `AuthService.js` handling user registration, login, logout, and session check.
- Connected all components (`AuthLogin`, `AuthRegister`, etc.) to use service methods.
- Enabled real-time user info display on dashboard after login.
- Handled edge cases such as failed login/register due to invalid credentials or missing fields.

---

## Reviewer Comments by Yitong Luo

✅ All API calls are abstracted cleanly into `AuthService.js`.  
✅ Login and Register components are functional and responsive.  
✅ Error handling works well, especially for Parse 401 errors.  
✅ User dashboard displays the expected user fields post-login.

🛠 Suggestion: Add loading state indicators on async form submissions to improve UX.
