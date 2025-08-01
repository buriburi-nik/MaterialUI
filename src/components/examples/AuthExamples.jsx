import React from 'react';
import { useAuth, useAuthProtection, useUserPermissions } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/ui/Badge';
import AuthGuard, { AuthenticatedOnly, UnauthenticatedOnly, AdminOnly, PremiumOnly } from '../auth/AuthGuard';
import { Lock, Crown, ShieldCheck, Download, Save, Users } from 'lucide-react';

const AuthExamples = () => {
  const { isAuthenticated, user, userProfile, login, logout } = useAuth();
  const { requireAuth, requireFeature } = useAuthProtection();
  const { isAdmin, isPremium, canAccessFeature } = useUserPermissions();

  // Example: Protected action handlers
  const handleSaveMaterial = requireAuth(() => {
    console.log('Saving material...');
    // Your save logic here
  }, { message: "Sign in to save materials to your boards" });

  const handleBulkDownload = requireFeature('bulk-download', () => {
    console.log('Starting bulk download...');
    // Your download logic here
  }, { message: "Upgrade to Premium for bulk download access" });

  const handleAdminAction = requireFeature('admin-panel', () => {
    console.log('Performing admin action...');
    // Your admin logic here
  }, { message: "Administrator access required" });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Redux Auth System Examples
        </h1>
        <p className="text-gray-600">
          Demonstrating conditional rendering and protected features
        </p>
      </div>

      {/* Auth Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Authentication Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={isAuthenticated ? "default" : "secondary"}>
              {isAuthenticated ? "Authenticated" : "Not Authenticated"}
            </Badge>
            {isAdmin && <Badge variant="destructive">Admin</Badge>}
            {isPremium && <Badge variant="outline">Premium</Badge>}
          </div>
          
          {userProfile && (
            <div className="bg-gray-50 p-3 rounded-md">
              <p><strong>Name:</strong> {userProfile.fullName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role || 'User'}</p>
              <p><strong>Initials:</strong> {userProfile.initials}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conditional Rendering Examples */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Show/Hide based on auth state */}
        <Card>
          <CardHeader>
            <CardTitle>Show/Hide Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            
            <UnauthenticatedOnly>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800 text-sm">
                  👋 Welcome! Please sign in to access all features.
                </p>
              </div>
            </UnauthenticatedOnly>

            <AuthenticatedOnly>
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-sm">
                  ✅ You're signed in! Full access enabled.
                </p>
              </div>
            </AuthenticatedOnly>

            <AdminOnly fallback={
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-gray-600 text-sm">
                  🔒 Admin features hidden
                </p>
              </div>
            }>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                <p className="text-purple-800 text-sm">
                  👑 Admin panel available
                </p>
              </div>
            </AdminOnly>

            <PremiumOnly fallback={
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 text-sm">
                  ⭐ Upgrade to Premium for advanced features
                </p>
              </div>
            }>
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-md">
                <p className="text-indigo-800 text-sm">
                  💎 Premium features unlocked
                </p>
              </div>
            </PremiumOnly>

          </CardContent>
        </Card>

        {/* Protected Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Protected Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            
            <Button 
              onClick={handleSaveMaterial}
              className="w-full flex items-center gap-2"
              variant="outline"
            >
              <Save className="w-4 h-4" />
              Save Material
            </Button>

            <Button 
              onClick={handleBulkDownload}
              className="w-full flex items-center gap-2"
              variant="outline"
              disabled={!canAccessFeature('bulk-download')}
            >
              <Download className="w-4 h-4" />
              Bulk Download {!isPremium && <Lock className="w-3 h-3" />}
            </Button>

            <Button 
              onClick={handleAdminAction}
              className="w-full flex items-center gap-2"
              variant="outline"
              disabled={!isAdmin}
            >
              <Users className="w-4 h-4" />
              Admin Panel {!isAdmin && <Lock className="w-3 h-3" />}
            </Button>

          </CardContent>
        </Card>
      </div>

      {/* Feature Access Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Access Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Save Materials', feature: 'save-materials' },
              { name: 'Create Boards', feature: 'create-boards' },
              { name: 'Premium Samples', feature: 'premium-samples' },
              { name: 'Bulk Download', feature: 'bulk-download' },
              { name: 'Advanced Filters', feature: 'advanced-filters' },
              { name: 'Export Data', feature: 'export-data' },
              { name: 'User Management', feature: 'user-management' },
              { name: 'Admin Panel', feature: 'admin-panel' },
            ].map((item) => (
              <div 
                key={item.feature}
                className={`p-3 rounded-md border text-center ${
                  canAccessFeature(item.feature)
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
              >
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs mt-1">
                  {canAccessFeature(item.feature) ? '✅ Available' : '🔒 Locked'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Auth Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <AuthGuard requireAuth={false} inverse={true}>
              <Button onClick={() => login({ email: 'demo@example.com', password: 'demo123' })}>
                Demo Login
              </Button>
            </AuthGuard>
            
            <AuthenticatedOnly>
              <Button variant="outline" onClick={() => logout()}>
                Logout
              </Button>
            </AuthenticatedOnly>
            
            <Button 
              variant="secondary" 
              onClick={() => console.log('Feature access:', {
                isAuthenticated,
                isAdmin,
                isPremium,
                features: {
                  saveMaterials: canAccessFeature('save-materials'),
                  bulkDownload: canAccessFeature('bulk-download'),
                  adminPanel: canAccessFeature('admin-panel'),
                }
              })}
            >
              Log Feature Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthExamples;
