# Redux Authentication System

A comprehensive authentication system built with Redux Toolkit, featuring persistence, async operations, and conditional rendering.

## Features

- ✅ **Persistent Authentication** - Automatically saves/restores login state
- ✅ **Async Operations** - Login, register, logout with proper error handling
- ✅ **Role-Based Access** - Admin, premium user features
- ✅ **Feature Gating** - Control access to specific features
- ✅ **Form Management** - Built-in login/register form state
- ✅ **Auto Token Refresh** - Automatic logout before token expiry
- ✅ **Conditional Rendering** - Show/hide UI based on auth state
- ✅ **Protected Routes** - Route-level authentication
- ✅ **Type-Safe Selectors** - Optimized Redux selectors

## Quick Start

### 1. Basic Authentication Check

```jsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, userProfile } = useAuth();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {userProfile.fullName}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### 2. Protected Actions

```jsx
import { useAuthProtection } from '@/hooks/useAuth';

function MaterialCard({ material }) {
  const { requireAuth } = useAuthProtection();

  const handleSave = requireAuth(() => {
    // This only runs if user is authenticated
    saveMaterial(material.id);
  }, { 
    message: "Sign in to save materials",
    redirectTo: "/signin" 
  });

  return (
    <div>
      <h3>{material.name}</h3>
      <button onClick={handleSave}>Save Material</button>
    </div>
  );
}
```

### 3. Conditional Rendering

```jsx
import { AuthenticatedOnly, UnauthenticatedOnly, AdminOnly } from '@/components/auth/AuthGuard';

function Navbar() {
  return (
    <nav>
      <UnauthenticatedOnly>
        <button>Sign In</button>
        <button>Register</button>
      </UnauthenticatedOnly>

      <AuthenticatedOnly>
        <button>Dashboard</button>
        <button>Profile</button>
      </AuthenticatedOnly>

      <AdminOnly>
        <button>Admin Panel</button>
      </AdminOnly>
    </nav>
  );
}
```

### 4. Form Management

```jsx
import { useLoginForm } from '@/hooks/useAuth';

function LoginForm() {
  const { form, validation, updateField, handleSubmit, isLoading } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
      {validation.errors.email && <span className="error">{validation.errors.email}</span>}

      <input
        type="password"
        value={form.password}
        onChange={(e) => updateField('password', e.target.value)}
        placeholder="Password"
      />
      {validation.errors.password && <span className="error">{validation.errors.password}</span>}

      <button type="submit" disabled={!validation.canSubmit || isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### 5. Protected Routes

```jsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      
      {/* Requires authentication */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Requires admin role */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireRole="admin">
            <AdminPanel />
          </ProtectedRoute>
        } 
      />
      
      {/* Requires premium feature */}
      <Route 
        path="/premium" 
        element={
          <ProtectedRoute requireFeature="premium-samples">
            <PremiumFeatures />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

## API Reference

### Hooks

#### `useAuth()`
Main authentication hook providing core auth state and actions.

```jsx
const {
  // State
  isAuthenticated,    // boolean: User is logged in
  isLoading,         // boolean: Auth operation in progress  
  isInitialized,     // boolean: Auth state has been loaded
  user,              // object: User data
  userProfile,       // object: Computed user profile
  error,             // string: Current error message
  authStatus,        // object: Combined status info

  // Actions
  login,             // function: Login user
  register,          // function: Register user  
  logout,            // function: Logout user
  clearError,        // function: Clear error state
} = useAuth();
```

#### `useAuthProtection()`
Hook for protecting actions and features.

```jsx
const {
  isAuthenticated,   // boolean: User is logged in
  requireAuth,       // function: Protect action with auth check
  requireFeature,    // function: Protect action with feature check
  canAccessFeature,  // function: Check if user can access feature
} = useAuthProtection();
```

#### `useUserPermissions()`
Hook for checking user roles and permissions.

```jsx
const {
  isAuthenticated,   // boolean: User is logged in
  isAdmin,          // boolean: User has admin role
  isPremium,        // boolean: User has premium subscription
  canAccessFeature, // function: Check feature access
  
  // Convenience methods
  canManageUsers,   // boolean: Can manage users
  canExportData,    // boolean: Can export data
} = useUserPermissions();
```

#### `useLoginForm()` / `useRegisterForm()`
Hooks for managing authentication forms.

```jsx
const {
  form,             // object: Form data
  validation,       // object: Validation state
  isLoading,        // boolean: Form submission in progress
  updateField,      // function: Update form field
  clearForm,        // function: Clear form data
  handleSubmit,     // function: Submit form
} = useLoginForm();
```

### Components

#### `<AuthGuard>`
Conditionally render children based on auth state.

```jsx
<AuthGuard 
  requireAuth={true}      // Require authentication
  requireRole="admin"     // Require specific role
  requireFeature="premium" // Require feature access
  inverse={false}         // Invert logic (show when NOT authenticated)
  fallback={<div>No access</div>} // Fallback content
>
  <SecretContent />
</AuthGuard>
```

#### `<ProtectedRoute>`
Protect entire routes with authentication.

```jsx
<ProtectedRoute 
  requireAuth={true}        // Require authentication
  requireRole="admin"       // Require specific role
  requireFeature="premium"  // Require feature access
  fallbackPath="/signin"    // Redirect path for unauth users
  showLoading={true}        // Show loading during auth check
>
  <Dashboard />
</ProtectedRoute>
```

### Actions

#### Async Thunks
- `loginUser(credentials)` - Login with email/password
- `registerUser(userData)` - Register new user
- `logoutUser()` - Logout current user
- `loadPersistedAuth()` - Load saved auth state

#### Sync Actions
- `updateLoginForm({ field, value })` - Update login form
- `updateRegisterForm({ field, value })` - Update register form
- `clearLoginForm()` - Clear login form
- `clearRegisterForm()` - Clear register form
- `clearError()` - Clear error state

### Selectors

```jsx
import {
  selectIsAuthenticated,
  selectUser,
  selectUserProfile,
  selectAuthStatus,
  selectCanAccessFeature,
  selectLoginFormValidation,
  // ... more selectors
} from '@/store/selectors/authSelectors';
```

## Feature Access Control

Define feature access rules in `authSelectors.js`:

```jsx
const featureRules = {
  'premium-samples': user?.subscriptionType === 'premium',
  'bulk-download': user?.subscriptionType === 'premium',
  'advanced-filters': isAuthenticated,
  'save-materials': isAuthenticated,
  'create-boards': isAuthenticated,
  'export-data': user?.role === 'admin',
  'user-management': user?.role === 'admin',
};
```

## Persistence

Authentication state is automatically persisted to localStorage:

- **Token storage**: Secure token storage with expiration
- **Auto-restore**: Automatically restores auth state on app startup
- **Auto-logout**: Logs out user before token expires
- **Error handling**: Graceful handling of storage errors

## Error Handling

The system includes comprehensive error handling:

- **Network errors**: Handles connection issues
- **Auth errors**: Invalid credentials, expired tokens
- **Validation errors**: Form validation with user feedback
- **Storage errors**: LocalStorage failures

## Best Practices

1. **Always use hooks** instead of accessing Redux state directly
2. **Protect sensitive actions** with `requireAuth` or `requireFeature`
3. **Use AuthGuard components** for conditional rendering
4. **Handle loading states** in your UI
5. **Show meaningful error messages** to users
6. **Test auth flows** thoroughly

## Example Integration

See `src/components/examples/AuthExamples.jsx` for a complete working example demonstrating all features.
