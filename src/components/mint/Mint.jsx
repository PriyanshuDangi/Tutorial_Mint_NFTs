import React, {useEffect, useState} from 'react';
import {uploadToIpfs} from '../../utils/upload';

import {getNFTs, mintNFT} from '../../utils/wallet';
import {useSelector} from 'react-redux';
import {selectLoaded, selectStorage, setStorage} from '../../store/reducers/storage';
import {useDispatch} from 'react-redux';
import {selectConnected, selectPKH} from '../../store/reducers/wallet';

const Mint = () => {
    const loaded = useSelector(selectLoaded);
    const storage = useSelector(selectStorage);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const connected = useSelector(selectConnected);
    const pkh = useSelector(selectPKH);

    useEffect(() => {
        if (loaded) {
            setShow(true);
        }
    }, [loaded]);

    const submit = async (event) => {
        try {
            event.preventDefault();
            setLoading(true);
            const address = event.target.address.value;
            const name = event.target.name.value;
            const description = event.target.description.value;
            const file = event.target.image.files[0];

            const ipfsUrl = await uploadToIpfs(name, description, file);
            console.log(ipfsUrl);

            const op = await mintNFT(address, ipfsUrl, storage.length);

            console.log(op);
            setMessage('Minted Successfully!');

            setLoading(false);
            func();
        } catch (err) {
            console.log(err);
            setLoading(false);
            setMessage('Error: Not Able to Mint');
        }
    };

    const func = async () => {
        const nfts = await getNFTs();
        dispatch(setStorage(nfts));
    };

    return (
        <div className="container">
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="tokenID" className="form-label">
                        Token ID
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="tokenID"
                        aria-describedby="tokenID"
                        required
                        value={storage.length}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input type="text" className="form-control" id="address" aria-describedby="address" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        aria-describedby="description"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input className="form-control" type="file" id="image" accept="image/*" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    Mint
                </button>
            </form>
        </div>
    );
};

export default Mint;
