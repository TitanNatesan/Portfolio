import SideCard from '@/components/sidecard/SideCard';
import Navbar from '@/components/navbar/Navbar';
import Main from '@/components/main/Main';

export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="content-container">
        <SideCard />
        <Main />
        <Navbar />
      </div>
    </div>
  );
}
