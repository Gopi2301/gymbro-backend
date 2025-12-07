# Protected Routes Implementation

I have implemented protected routes for the User resource, integrating Supabase Authentication with Drizzle ORM.

## Changes Made

### 1. User Controller (`src/controllers/user.controller.ts`)

- Implemented `getUser` function.
- Validates that the authenticated user (Supabase) matches the requested `id` (Authorization).
- Queries the Drizzle ORM `usersTable` using the user's email to fetch application-specific data.
- Returns a combined response with Supabase ID and Drizzle user data.

### 2. User Router (`src/routes/user.router.ts`)

- Defined a new router for user-related endpoints.
- Added `GET /:id` route.
- Applied `requireAuth` middleware to protect the route.

## How to Use

1.  **Authenticate**: Obtain a Bearer token by signing in via `POST /api/v1/auth/signin`.
2.  **Access Protected Route**: Make a GET request to `/api/v1/users/<YOUR_SUPABASE_USER_ID>` with the header `Authorization: Bearer <TOKEN>`.

## Important Note on Data Synchronization

The current `signup` process in `auth.controller.ts` creates a user in Supabase but **does not** create a corresponding record in the Drizzle `usersTable`.
As a result, `getUser` will return a 404 for the database profile (while still validating the auth).

**Recommendation**:
Update the `signup` controller to insert a record into `usersTable` after successful Supabase signup. Note that `usersTable` currently requires an `age` field, which is not collected during signup. You may need to:

1.  Update the signup form/schema to collect `age`.
2.  Or make `age` optional in `src/db/schema.ts`.
