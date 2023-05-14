import Link from "next/link";

const Navigation = (): JSX.Element => {
  return (
    <div className="container mx-auto text-center text-white">
      <ul className="flex">
        <li className="mr-6">
          <Link href="/" className="text-blue-500 hover:text-blue-800">
            <span>Home</span>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/web_load" className="text-blue-500 hover:text-blue-800">
            <span>web_load</span>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/text_load" className="text-blue-500 hover:text-blue-800">
            <span>text_load</span>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/file_load" className="text-blue-500 hover:text-blue-800">
            <span>file_load</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
