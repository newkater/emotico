interface IProps {
    children: React.ReactNode;
  }
  
  export const CardContent: React.FC<IProps> = ({ children }) => {
    return <div className="bg-slate-50 p-10 rounded-md shadow-lg m-3">{children}</div>;
  };