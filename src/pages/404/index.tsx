import { useNavigate } from "react-router";

import NotFoundImg from "../../assets/image/Photo-min.png";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      data-testid="404-page"
      className="flex h-screen flex-col items-center justify-center bg-grey-10"
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={NotFoundImg}
          alt="not-found"
          className="md:w-[400px] w-[300px]"
        />
        <p className="my-0 text-center text-3xl font-bold text-black-90">
          Kami tidak menemukan halaman yang Anda cari
        </p>
        <button
          onClick={() => navigate("/campaign")}
          className="w-2/4 py-2 px-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

export default NotFound;
