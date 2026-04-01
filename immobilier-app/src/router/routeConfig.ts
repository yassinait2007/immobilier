// Route configuration with role-based access control

export interface RouteConfig {
  path: string;
  allowedRoles?: ('client' | 'host')[];
  requireAuth?: boolean;
  redirectTo?: string;
  description?: string;
}

export const routeConfigs: Record<string, RouteConfig> = {
  // Public routes (no authentication required)
  home: {
    path: '/',
    requireAuth: false,
    description: 'Homepage - accessible to everyone'
  },
  categories: {
    path: '/categories',
    requireAuth: false,
    description: 'Property categories - accessible to everyone'
  },
  propertyDetails: {
    path: '/property/:id',
    requireAuth: false,
    description: 'Property details - accessible to everyone'
  },
  clientProfile: {
    path: '/client/profile/:id',
    requireAuth: false,
    description: 'Client profile - accessible to everyone'
  },
  hostProfile: {
    path: '/host/profile/:id',
    requireAuth: false,
    description: 'Host profile - accessible to everyone'
  },

  // Client-only routes
  becomeHost: {
    path: '/become-host',
    allowedRoles: ['client'],
    requireAuth: true,
    redirectTo: '/host-space',
    description: 'Become a host - only for clients'
  },
  myProfile: {
    path: '/my-profile',
    allowedRoles: ['client'],
    requireAuth: true,
    description: 'My profile - only for clients'
  },

  // Host-only routes
  hostSpace: {
    path: '/host-space',
    allowedRoles: ['host'],
    requireAuth: true,
    redirectTo: '/become-host',
    description: 'Host dashboard - only for hosts'
  },
  addProperty: {
    path: '/host/add-property',
    allowedRoles: ['host'],
    requireAuth: true,
    redirectTo: '/become-host',
    description: 'Add property - only for hosts'
  },
  editProperty: {
    path: '/host/edit-property/:id',
    allowedRoles: ['host'],
    requireAuth: true,
    redirectTo: '/become-host',
    description: 'Edit property - only for hosts'
  },

  // Both roles can access
  inbox: {
    path: '/inbox',
    allowedRoles: ['client', 'host'],
    requireAuth: true,
    description: 'Inbox - for authenticated users'
  },
  favorites: {
    path: '/favorites',
    allowedRoles: ['client', 'host'],
    requireAuth: true,
    description: 'Favorites - for authenticated users'
  },
  clientBookings: {
    path: '/client/bookings',
    allowedRoles: ['client', 'host'],
    requireAuth: true,
    description: 'Client bookings - for authenticated users'
  },
  checkout: {
    path: '/checkout/:id',
    allowedRoles: ['client', 'host'],
    requireAuth: true,
    description: 'Checkout - for authenticated users'
  },
};

/**
 * Get route config by path
 */
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return Object.values(routeConfigs).find(config => {
    // Handle dynamic routes (with :id parameters)
    const routePattern = config.path.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(path);
  });
};

/**
 * Check if user can access a route
 */
export const canAccessRoute = (
  path: string, 
  userRole?: 'client' | 'host', 
  isAuthenticated?: boolean
): boolean => {
  const config = getRouteConfig(path);
  
  if (!config) return true; // Unknown routes are accessible by default
  
  if (config.requireAuth && !isAuthenticated) {
    return false;
  }
  
  if (config.allowedRoles && userRole && !config.allowedRoles.includes(userRole)) {
    return false;
  }
  
  return true;
};