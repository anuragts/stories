import Header from "./Header";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <link
        href="https://api.fontshare.com/v2/css?f[]=chillax@600,500,300,700,400,200&display=swap"
        rel="stylesheet"
      ></link>
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
