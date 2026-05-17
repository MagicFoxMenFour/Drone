import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { CasesPage } from "./pages/CasesPage";
import { CaseDetailPage } from "./pages/CaseDetailPage";
import { AboutPage } from "./pages/AboutPage";

import { ContactsPage } from "./pages/ContactsPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminForbiddenPage } from "./pages/admin/AdminForbiddenPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminServicesPage } from "./pages/admin/AdminServicesPage";
import { AdminServiceEditPage } from "./pages/admin/AdminServiceEditPage";
import { AdminCasesPage } from "./pages/admin/AdminCasesPage";
import { AdminCaseEditPage } from "./pages/admin/AdminCaseEditPage";
import { AdminBlogPage } from "./pages/admin/AdminBlogPage";
import { AdminBlogEditPage } from "./pages/admin/AdminBlogEditPage";
import { AdminAboutPage } from "./pages/admin/AdminAboutPage";
import { AdminEmployeesPage } from "./pages/admin/AdminEmployeesPage";
import { AdminLeadsPage } from "./pages/admin/AdminLeadsPage";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/forbidden",
    element: <AdminForbiddenPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "services", element: <AdminServicesPage /> },
      { path: "services/:id", element: <AdminServiceEditPage /> },
      { path: "cases", element: <AdminCasesPage /> },
      { path: "cases/:id", element: <AdminCaseEditPage /> },
      { path: "blog", element: <AdminBlogPage /> },
      { path: "blog/:id", element: <AdminBlogEditPage /> },
      { path: "about", element: <AdminAboutPage /> },
      { path: "employees", element: <AdminEmployeesPage /> },
      { path: "leads", element: <AdminLeadsPage /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "services/:slug", element: <ServiceDetailPage /> },
      { path: "cases", element: <CasesPage /> },
      { path: "cases/:slug", element: <CaseDetailPage /> },
      { path: "about", element: <AboutPage /> },

      { path: "contacts", element: <ContactsPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogPostPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
