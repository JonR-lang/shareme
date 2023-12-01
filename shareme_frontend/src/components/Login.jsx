import magic from "../assets/magic.mp4";

const Login = () => {
  return (
    <div className="h-screen bg-red-100">
      <div className="h-full w-full relative">
        <video
          src={magic}
          typeof="video/mp4"
          controls={false}
          autoPlay
          loop
          muted
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 flex justify-center items-center">
          <div className="p-2 text-center space-y-2">
            <h1 className="text-white text-2xl uppercase ">Fotofusion</h1>
            <p className="bg-white p-3 rounded-md">Log in</p>
          </div>
        </div>
      </div>
      {/* <video src={backVid}></video> */}
      <p>I am horny</p>
    </div>
  );
};

export default Login;
