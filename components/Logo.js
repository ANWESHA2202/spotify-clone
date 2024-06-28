import Image from "next/image";

const Logo = () => {
  return (
    <span>
      <Image src={"Logo.svg"} width={100} height={50} />
    </span>
  );
};

export default Logo;
