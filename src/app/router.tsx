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

export const router = createBrowserRouter([
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
