import AdminNav from "@/components/nav/AdminNav";



export default function AdminDashboard({ children }) {
    return (
        <div>
            <AdminNav />
            {children}
        </div>
    );
}
