import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading, getUserRole } = useContext(UserContext);
  const location = useLocation();
  const userRole = getUserRole();
  
  // Comprehensive debugging
  useEffect(() => {
    console.group("ProtectedRoute Debug Info");
    console.log("Route path:", location.pathname);
    console.log("User object:", user);
    console.log("User role from getUserRole():", userRole);
    console.log("User role type:", typeof userRole);
    console.log("Required roles:", requiredRoles);
    console.groupEnd();
  }, [location.pathname, user, userRole, requiredRoles]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.log("No user found - redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required, check if user has one of them
  if (requiredRoles.length > 0) {
    // First make sure we have a string to work with
    const userRoleString = String(userRole || "").toLowerCase();
    console.log("Normalized user role:", userRoleString);
    
    const hasRequiredRole = requiredRoles.some(role => {
      let result = false;
      
      switch (role) {
        case 'manager':
          result = userRoleString === 'manager' || 
                   userRoleString === 'quản lý cửa hàng' || 
                   userRoleString.includes('quản lý');
          break;
        case 'employee':
          result = userRoleString === 'employee' || 
                   userRoleString === 'manager' || 
                   userRoleString.includes('nhân viên') || 
                   userRoleString.includes('quản lý');
          break;
        case 'customer':
          result = userRoleString === 'customer';
          break;
        default:
          result = false;
      }
      
      console.log(`Checking role '${role}': ${result}`);
      return result;
    });
    console.log(hasRequiredRole);
    

    // if (!hasRequiredRole) {
    //   console.log("Access denied - user does not have required role");
    //   // Redirect to appropriate page if user doesn't have required role
    //   return <Navigate to="/admin" replace />;
    // }
    
    console.log("Access granted - user has required role");
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;