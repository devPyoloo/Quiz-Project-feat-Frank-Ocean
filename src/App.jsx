import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
} from "react-router-dom";
import StartQuiz from "./components/Start";
import Home from "./components/Home";
import { QuizProvider } from "./Context/QuizProvider";
import { End } from "./components/End";
import RootLayer from "./layout/RootLayer";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <QuizProvider>
      <Route index element={<RootLayer />}>
        <Route path="/" element={<Home />}>
          <Route path="question/:id" element={<StartQuiz />} />
        </Route>
        <Route path="/end" element={<End />} />
      </Route>
    </QuizProvider>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
