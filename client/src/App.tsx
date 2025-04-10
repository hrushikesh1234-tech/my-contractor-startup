import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ProfessionalsListingPage from "@/pages/ProfessionalsListingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AboutUsPage from "@/pages/AboutUsPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import ProfilePage from "@/pages/ProfilePage";
import DashboardPage from "@/pages/DashboardPage";
import BookmarkedPage from "@/pages/BookmarkedPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/professionals" component={ProfessionalsListingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/about" component={AboutUsPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/bookmarked" component={BookmarkedPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
