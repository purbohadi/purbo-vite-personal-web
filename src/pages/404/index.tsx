import { useNavigate } from "react-router";

import NotFoundImg from "../../assets/image/Photo-min.png";
import Button from "../../components/buttons";

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
        <Button
          onClick={() => navigate("/campaign")}
          type="primary"
          size="large"
          className="w-2/4"
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
