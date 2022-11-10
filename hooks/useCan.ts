import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParmns = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParmns) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    roles,
    user,
    permissions,
  });

  return userHasValidPermissions;
}
