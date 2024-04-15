import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }) => (
  <div className="fixed w-full min-h-full flex justify-center py-10 top-0 bottom-0 bg-fill-medium overflow-y-auto">
    {children}
  </div>
);

export default AuthLayout;
