# Changelog

## [0.3.0] - 2025-07-10

### Development Timeline

- 2025-07-07 – Created `AuthService.js` with register, login, logout, and user session management using Parse.
- 2025-07-08 – Implemented `ProtectedRoute` for restricting unauthenticated access to protected pages.
- 2025-07-09 – Developed `AuthRegister`, `AuthLogin`, and `AuthModule` components with navigation and form handling.
- 2025-07-10 – Completed `MainList` dashboard with logout functionality and user profile display. Connected and verified Back4App integration.

### Added

- `ProtectedRoute` component to restrict access to authenticated users.
- `AuthService.js` for managing user registration, login, logout, and session state.
- `AuthRegister`, `AuthLogin`, and `AuthModule` components for user interaction.
- `MainList` dashboard with logout and current user info display.

### Security

- Protected routes cannot be accessed without authentication.
- Manual navigation to protected routes redirects unauthenticated users to `/auth`.
- Logged-in users are redirected away from login or registration pages.

### Improvements

- Authentication logic separated into service module.
- All major routes covered with consistent access control.
- Code structured to support scalability and maintenance.
