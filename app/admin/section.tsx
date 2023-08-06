import Link from "next/link";

type Category = {
  name: String;
};

const Section = ({ name }: Category) => {
  return (
    <Link href={`/admin/${name}`}>
      <div className="bg-blue-500 hover:bg-blue-700 duration-300 font-medium uppercase cursor-pointer text-white text-lg flex max-w-fit p-5 m-auto rounded-md self-center">
        {name}
      </div>
    </Link>
  );
};

export default Section;
