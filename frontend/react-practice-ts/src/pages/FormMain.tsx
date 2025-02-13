import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import FormSelect from "../components/form/FormSelect";


const FormMain = () => {

    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div className="componentContainer1">
                    <FormSelect/>
                </div>
            </div>
        </div>
    )
}

export default FormMain;