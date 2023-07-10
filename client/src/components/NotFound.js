
import MainLayout from "../layout/MainLayout";
import "../styles/notFound.css";

function NotFound() {
    return ( 
        <MainLayout>
            <div className="page">
                <h1>Error 404: page not found :(</h1>
                <button>Home</button>
            </div>
        </MainLayout>
     );
}

export default NotFound;