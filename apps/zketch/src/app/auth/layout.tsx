import { ToastProvider, ToastViewport } from "../../components/ui/toast";
import { ToastContainer } from "@/components/ui/toastContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      {children}
      <ToastContainer />
      <ToastViewport />
    </ToastProvider>
  );
}