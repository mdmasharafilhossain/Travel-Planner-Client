import AddPlan from "@/components/modules/plan/AddPlan";
import AuthWrapper from "@/lib/AuthWrapper";


const AddPlanPage = () => {
    return (
        <div>
            <AuthWrapper><AddPlan/> </AuthWrapper>
           
        </div>
    );
};

export default AddPlanPage;