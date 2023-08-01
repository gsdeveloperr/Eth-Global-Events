// Assets
import down from "../assets/angle-down-solid.svg";
import Image from "next/image";

const Sort = () => {
  return (
    <div className="sort">
      <div className="sort__select">
        <p>Pick Your Genre</p>
        <Image src={down} alt="Dropdown" />
      </div>

      <div className="sort__select">
        <p>Your date selection</p>
        <Image src={down} alt="Dropdown" />
      </div>

      <div className="sort__select">
        <p>Choose Your Reach</p>
        <Image src={down} alt="Dropdown" />
      </div>
    </div>
  );
};

export default Sort;
