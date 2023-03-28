function Loginbutton() {
  return (
    <div className="pr-4 min-w-full flex justify-end">
      <button
        onClick={() => {
          window.location.href = "/Login";
        }}
        className="h-10 px-5 font-bold text-white transition-colors rounded-lg"
      >
        Login
      </button>
      <button
        onClick={() => {
          window.location.href = "/SignUp";
        }}
        className="h-10 px-5 font-bold text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Loginbutton;
