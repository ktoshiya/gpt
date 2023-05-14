import { firebaseAuth } from "@/utils/firebaseClient";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = (): JSX.Element => {
  const router = useRouter();
  const logout = () => {
    signOut(firebaseAuth)
      .then(() => {
        router.push("/login");
        console.log("Sign-out successful.");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="mt-3">
      <ul className="p-3 flex">
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
        <li className="mr-6 ml-20">
          <button
            onClick={logout}
            className="text-blue-500 hover:text-blue-800"
          >
            <span>logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
