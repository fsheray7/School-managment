import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Results = () => {
  return (
    <section className=" w-full bg-white flex flex-col items-center">
      <div className="w-full mt-32 flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 pb-10 px-4">
        <div
          className="w-full flex flex-col items-center justify-center p-4 border-t-8 rounded-xl max-w-md shadow-xl gap-8"
          style={{ borderTopColor: "var(--primary-color)" }}
        >
          <h2
            className="w-full flex items-center justify-start  font-bold text-xl "
            style={{ color: "var(--primary-color)" }}
          >
            First Terminal
          </h2>
          className="w-full px-4 outline-none py-3 bg-gray-50 border
          border-gray-300 rounded-md"
          <span
            className="w-full text-xl font-semibold uppercase py-3 flex items-center justify-end gap-2 hover:brightness-90 transition-all"
            style={{ color: "var(--primary-color)" }}
          >
            <Link to="/marks">Publish</Link>
          </span>
        </div>
        <div
          className="w-full flex flex-col items-center justify-center p-4 border-t-8 rounded-xl max-w-md shadow-lg gap-8"
          style={{ borderTopColor: "var(--primary-color)" }}
        >
          <h2
            className="w-full flex items-center justify-start  font-bold text-xl "
            style={{ color: "var(--primary-color)" }}
          >
            Second Terminal
          </h2>
          <input
            type="text"
            className="w-full px-4 outline-none py-3 bg-gray-50 border border-gray-300 rounded-md"
          />

          <span
            className="w-full text-xl font-semibold uppercase py-3 flex items-center justify-end gap-2 hover:brightness-90 transition-all"
            style={{ color: "var(--primary-color)" }}
          >
            <Link to="/marks">Publish</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Results;
