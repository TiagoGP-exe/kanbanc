import Logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="bg-white py-6 flex justify-center rounded-b-2xl w-full">
      <div className="flex justify-between w-11/12 max-w-screen-lg items-center px-4">
        <img src={Logo} alt="logo" className="h-6" />
        {/* <div className="flex gap-3 items-center">
          <img
            src={Photo}
            className="w-12 h-12 object-cover rounded-2xl "
            alt="logo"
          />
          <div className="flex flex-col justify-center items-start">
            <h5 className="text-xl leading-none">Roberto</h5>
            <p>Almeida</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
