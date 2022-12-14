import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";

import { setupAPIClint } from "../services/api";
import { api } from "../services/apiClint";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, singOut, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>

      <button onClick={singOut}>Sign out</button>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClint = setupAPIClint(ctx);
  const response = await apiClint.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});
