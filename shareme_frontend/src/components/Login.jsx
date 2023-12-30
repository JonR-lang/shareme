import magic from "../assets/magic.mp4";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import { decode } from "../utils/decode";
const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response ? response : "waiting");
    const decodedToken = decode(response.credential);

    console.log(decodedToken);

    localStorage.setItem("user", JSON.stringify(decodedToken));

    const { name, picture, sub } = decodedToken;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(user).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className='h-screen bg-red-100'>
      <div className='h-full w-full relative'>
        <video
          src={magic}
          typeof='video/mp4'
          controls={false}
          autoPlay
          loop
          muted
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black/70 flex justify-center items-center'>
          <div className='p-2 text-center space-y-2'>
            <h1 className='text-white text-2xl uppercase tracking-widest'>
              Fotofusion
            </h1>
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={() => {
                console.log("Error");
              }}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
