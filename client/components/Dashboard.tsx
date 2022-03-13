import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRouter } from "next/router";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";


function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useAppSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      router.push("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, router, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals?.length > 0 ? (
          <div className="goals">
            {goals.map((goal: any) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
