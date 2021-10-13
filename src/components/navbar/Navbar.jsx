import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removePKH, selectConnected, selectPKH, setPKH} from '../../store/reducers/wallet';
import {connectWallet, disconnectWallet, getPKH} from '../../utils/wallet';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    const connected = useSelector(selectConnected);
    const pkh = useSelector(selectPKH);
    const dispatch = useDispatch();

    const connect = async () => {
        try {
            await connectWallet();
            const pkh = await getPKH();
            dispatch(setPKH(pkh));
        } catch (err) {
            console.log(err);
        }
    };

    const disconnect = async () => {
        try {
            await disconnectWallet();
            dispatch(removePKH());
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/mint">
                    Mint NFTs
                </NavLink>
            </li>
            <li className="nav-item">
                {connected ? (
                    <button className="btn btn-outline-primary walletButton" onClick={disconnect}>
                        <span>ꜩ</span> {pkh.substring(0, 6) + '...' + pkh.substring(pkh.length - 4)}
                    </button>
                ) : (
                    <button className="btn btn-primary walletButton" onClick={connect}>
                        Connect Wallet
                    </button>
                )}
            </li>
        </ul>
    );
};

export default Navbar;
