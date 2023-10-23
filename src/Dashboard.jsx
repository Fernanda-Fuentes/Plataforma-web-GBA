import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Dashboard() {
  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-2 xl:col-span-5 bg-white-100 p-3">
        <Header />
        <hr />
        <h4 className="text-center font-serif text-3xl mt-4">Grupo Biomédico Azteca S.A. de C.V.</h4>
      </main>
    </div>
  );
}

export default Dashboard;
