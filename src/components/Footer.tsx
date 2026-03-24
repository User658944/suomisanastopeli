import lfg from "/lfg.png";
export { YoutubeLink };
export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-white/60">
      <div className="flex items-center gap-4">
        <div className="relative w-8 h-5 bg-white">
          <div className="absolute left-[33%] top-0 w-[16%] h-full bg-blue-800" />
          <div className="absolute top-[37%] left-0 w-full h-[26%] bg-blue-800" />
        </div>
        <a
          href="https://youtube.com/@learnfinnishvideos5726?si=ju16vc09KwlesanM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <svg className="w-12 h-12" viewBox="0 0 24 24">
            {/* ulkokuori punainen */}
            <path
              fill="#FF0000"
              d="M23.498 6.186a2.95 2.95 0 0 0-2.073-2.088C19.446 3.5 12 3.5 12 3.5s-7.446 0-9.425.598A2.95 2.95 0 0 0 .502 6.186 30.17 30.17 0 0 0 0 12a30.17 30.17 0 0 0 .502 5.814 2.95 2.95 0 0 0 2.073 2.088C4.554 20.5 12 20.5 12 20.5s7.446 0 9.425-.598a2.95 2.95 0 0 0 2.073-2.088A30.17 30.17 0 0 0 24 12a30.17 30.17 0 0 0-.502-5.814z"
            />

            {/* play-ikoni valkoinen */}
            <path fill="#FFFFFF" d="M9.75 15.5v-7l6 3.5-6 3.5z" />
          </svg>

          <span className="text-white font-bold hover:underline">YouTube</span>
        </a>
        <img
          src={lfg}
          alt="Learn Finnish Games Logo"
          className="w-8 h-8 object-contain"
        />
      </div>
      <span>Learn Finnish Games</span>

      <div>
        © {new Date().getFullYear()} Learn Finnish Games. All rights reserved.
      </div>
    </div>
  );
}

function YoutubeLink() {
  return (
    <div className="flex flex-col items-center justify-center gap-2text-sm text-white/60">
      <div className="flex items-center gap-4">
        <a
          href="https://youtube.com/@learnfinnishvideos5726?si=ju16vc09KwlesanM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <svg className="w-12 h-12" viewBox="0 0 24 24">
            <path
              fill="#FF0000"
              d="M23.498 6.186a2.95 2.95 0 0 0-2.073-2.088C19.446 3.5 12 3.5 12 3.5s-7.446 0-9.425.598A2.95 2.95 0 0 0 .502 6.186 30.17 30.17 0 0 0 0 12a30.17 30.17 0 0 0 .502 5.814 2.95 2.95 0 0 0 2.073 2.088C4.554 20.5 12 20.5 12 20.5s7.446 0 9.425-.598a2.95 2.95 0 0 0 2.073-2.088A30.17 30.17 0 0 0 24 12a30.17 30.17 0 0 0-.502-5.814z"
            />
            <path fill="#FFFFFF" d="M9.75 15.5v-7l6 3.5-6 3.5z" />
          </svg>

          <span className="text-white font-bold hover:underline">YouTube</span>
        </a>
        <img
          src={lfg}
          alt="Learn Finnish Games Logo"
          className="w-8 h-8 object-contain"
        />
      </div>
    </div>
  );
}
