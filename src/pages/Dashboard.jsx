import { useEffect } from 'react';
export default function Dashboard() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Protected route</p>
        </div>
    );
}