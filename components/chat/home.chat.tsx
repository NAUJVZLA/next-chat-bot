import type { NextPage } from 'next';
import ChatBox from './chatBot';

const Home: NextPage = () => {
    return (
        <div className="container">
            <h1>Mi Chat Box</h1>
            <ChatBox />
        </div>
    );
};

export default Home;