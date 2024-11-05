import Sidebar from "../../components/SideBar/Sidebar";
import MainContent from "../../components/MainContent/MainContent";

const Dashoard = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', height: '100vh', width: '100vw'}}>
            <Sidebar />
            <MainContent />
        </div>
    );
  };
  
  export default Dashoard;