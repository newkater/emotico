interface IProps {
  children: React.ReactNode;
}

export const CardSubTitle: React.FC<IProps> = ({ children }) => {
  return <div className="text-secondary font-medium">{children}</div>;
};
