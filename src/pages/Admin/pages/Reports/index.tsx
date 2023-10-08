import AdminBar from "../../components/Adminbar";
import VerifyAdminIsTrue from "../../verifyAdminIsTrue";

export default function AdminReports() {
    return (
        <VerifyAdminIsTrue>
            <div className='lg:flex'>
                <AdminBar atualPage="reports" />
            </div>
        </VerifyAdminIsTrue>
    )
}