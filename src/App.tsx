import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn.js";
import { SignUp } from "./pages/SignUp.js";
import { Registration } from "./pages/Registration.js";
import { WorkTimesTable } from "./pages/WorkTimesTable.js";
import { WorkTimesDetail } from "./pages/WorkTimesDetail.js";
import { NotFound } from "./pages/NotFound.js";

export const App = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/work_times" element={<WorkTimesTable />} />
      <Route path="/work_times/:workTimesId" element={<WorkTimesDetail />} />
      <Route path="/work_times/registration" element={<Registration />} />
      <Route path="/work_times/registration/:workTimesId" element={<Registration />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
