import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, SuperAdminPreviledgeRoute } from "./RouteProtection";
import AuthService from "./services/auth.service";
import Loading from "./common/Loading";

const AppRoute = () => {
    const currentUser = AuthService.getCurrentUser();
    const Layout = lazy(() => import("./Frontend/pages/Layout"));
    const NoMatch = lazy(() => import("./common/NoMatch"));
    const Home = lazy(() => import("./Frontend/pages/Home"));
    const About = lazy(() => import("./Frontend/pages/About"));
    const Contact = lazy(() => import("./Frontend/pages/Contact"));
    const Login = lazy(() => import("./Frontend/pages/Login"));
    const Signup = lazy(() => import("./Frontend/pages/Signup"));
    const DashboardLayout = lazy(() => import("./Backend/pages/DashboardLayout"));
    const Dashboard = lazy(() => import("./Backend/pages/Dashboard"));

    const Faculty = lazy(() => import("./Backend/pages/Faculty"));
    const Subject = lazy(() => import("./Backend/pages/Subject"));
    const Department = lazy(() => import("./Backend/pages/Department"));
    const Teacher = lazy(() => import("./Backend/pages/Teacher"));
    const Student = lazy(() => import("./Backend/pages/Student"));
    const Attendance = lazy(() => import("./Backend/pages/Attendance"));
    const Fee = lazy(() => import("./Backend/pages/Fee"));
    // const TimeTable = lazy(() => import("./Backend/pages/TimeTable"));
    const UserManagement = lazy(() => import('./Backend/pages/UserManagement'));
    const Profile = lazy(() => import('./Backend/pages/Profile'));

    const SubjectList = lazy(() => import('./Backend/components/Attendance/SubjectList'));
    const TakeAttendance = lazy(() => import('./Backend/components/Attendance/TakeAttendance'));
    const ViewAttendance = lazy(() => import('./Backend/components/Attendance/ViewAttendance'));

    const FeeTable = lazy(() => import("./Backend/components/Fee/FeeTable"));
    const FacultyTable = lazy(() => import("./Backend/components/Faculty/FacultyTable"));
    const DepartmentTable = lazy(() => import("./Backend/components/Department/DepartmentTable"));
    const StudentTable = lazy(() => import("./Backend/components/Student/StudentTable"));
    const TeacherTable = lazy(() => import("./Backend/components/Teacher/TeacherTable"));
    const SubjectTable = lazy(() => import("./Backend/components/Subject/SubjectTable"));
    // const TimetableTable = lazy(() => import("./Backend/components/Timetable/TimetableTable"));
    const UserManagementTable = lazy(() => import("./Backend/components/UserManagement/UserManagementTable"));

    const FeeForm = lazy(() => import("./Backend/components/Fee/FeeForm"));
    const FacultyForm = lazy(() => import("./Backend/components/Faculty/FacultyForm"));
    const DepartmentForm = lazy(() => import("./Backend/components/Department/DepartmentForm"));
    const StudentForm = lazy(() => import("./Backend/components/Student/StudentForm"));
    const TeacherForm = lazy(() => import("./Backend/components/Teacher/TeacherForm"));
    const SubjectForm = lazy(() => import("./Backend/components/Subject/SubjectForm"));
    // const TimetableForm = lazy(() => import("./Backend/components/Timetable/TimetableForm"));
    const UserManagementForm = lazy(() => import("./Backend/components/UserManagement/UserManagementForm"));

    const SubjectDetail = lazy(() => import("./Backend/components/Subject/SubjectDetail"));
    const TeacherDetail = lazy(() => import("./Backend/components/Teacher/TeacherDetail"));
    const StudentDetail = lazy(() => import("./Backend/components/Student/StudentDetail"));

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Frontend Routes */}
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
                {/* Dashboard Routes */}
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute user={currentUser}>
                            <DashboardLayout user={currentUser} />
                        </ProtectedRoute>
                    }>
                    <Route index element={<Dashboard />} />
                    {/* Student Routes */}
                    <Route path="students" element={<Student />}>
                        <Route index element={<StudentTable />} />
                        <Route path="add" element={<StudentForm />} />
                        <Route path="edit/:id" element={<StudentForm />} />
                        <Route path=":id" element={<StudentDetail />} />
                    </Route>
                    {/* Teacher Routes */}
                    <Route path="teachers" element={<Teacher />}>
                        <Route index element={<TeacherTable />} />
                        <Route path="add" element={<TeacherForm />} />
                        <Route path="edit/:id" element={<TeacherForm />} />
                        <Route path=":id" element={<TeacherDetail />} />
                    </Route>
                    {/* Faculty Routes */}
                    <Route path="faculties" element={<Faculty />}>
                        <Route index element={<FacultyTable />} />
                        <Route path="add" element={<FacultyForm />} />
                        <Route path="edit/:id" element={<FacultyForm />} />
                    </Route>
                    {/* Department Routes */}
                    <Route path="departments" element={<Department />}>
                        <Route index element={<DepartmentTable />} />
                        <Route path="add" element={<DepartmentForm />} />
                        <Route path="edit/:id" element={<DepartmentForm />} />
                    </Route>
                    {/* Subject Routes */}
                    <Route path="subjects" element={<Subject />}>
                        <Route index element={<SubjectTable />} />
                        <Route path="add" element={<SubjectForm />} />
                        <Route path="edit/:id" element={<SubjectForm />} />
                        <Route path=":id" element={<SubjectDetail />} />
                    </Route>
                    {/* Attendance Routes */}
                    {/* WIP */}
                    {/* <Route path="attendance" element={<Attendance />}>
                        <Route index element={<SubjectList />} />
                        <Route path="takeattendance/:id" element={<TakeAttendance />} />
                        <Route path="viewattendance/:id" element={<ViewAttendance />} />
                    </Route> */}
                    {/* Fee Routes */}
                    <Route path="fee" element={<Fee />}>
                        <Route index element={<FeeTable />} />
                        <Route path="add" element={<FeeForm />} />
                        <Route path="edit/:id" element={<FeeForm />} />
                    </Route>
                    {/* Time Table Routes */}
                    {/* WIP */}
                    {/* <Route path="timetable" element={<TimeTable />}>
                        <Route index element={<TimetableTable />} />
                        <Route path="add" element={<TimetableForm />} />
                        <Route path="edit/:id" element={<TimetableForm />} />
                    </Route> */}
                    <Route path='profile' element={<Profile />}></Route>
                    <Route
                        path="usermanagement"
                        element={
                            <SuperAdminPreviledgeRoute user={currentUser}>
                                <UserManagement />
                            </SuperAdminPreviledgeRoute>}>
                        <Route index element={<UserManagementTable />} />
                        <Route path="add" element={<UserManagementForm />} />
                        <Route path="edit/:id" element={<UserManagementForm />} />
                    </Route>
                </Route>
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoute