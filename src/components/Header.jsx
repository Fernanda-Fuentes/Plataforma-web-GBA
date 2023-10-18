import { logout } from "../config/firebase";

const Header = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-lg font-serif mt-n2">
        Bienvenido(a)
      </h1>
      
      <form className="w-full md:w-auto">
        <div className="relative">
          <button
            className="bg-blue-700 btn btn-outline-primary text-blue py-1 px-2 rounded-md font-serif text-sm mt-n5"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
