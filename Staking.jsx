import {useState, useEffect} from "react";
import {ethers} from "ethers";
import {StakingABI} from "./abi/StakingABI";
import {TokenABI} from "./abi/TokenABI";

function Staking(){
    const[amount, setAmount] = useState("");
    const[stakedBalance, setStakedBalance] = useState("");
    const[reward, setReward] = useState("");

    const tokenAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";  
    const stakingAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

    const approveTokens = async() =>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            tokenAddress,
            TokenABI,
            signer
        );

        const tx = await contract.approve(stakingAddress, ethers.parseEther(amount));

        await tx.wait();

        alert("Tokens Approved");
    };

    const stakeTokens = async() =>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            stakingAddress,
            StakingABI,
            signer
        );

        const tx = await contract.stake(ethers.parseEther(amount));

        await tx.wait();

        alert("Tokens Staked");
    };

    const unstakeTokens = async() =>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            stakingAddress,
            StakingABI,
            signer
        );

        const tx = await contract.unstake();

        await tx.wait();
        await loadStakeData();

        alert("Tokens Unstaked");
    };

    const loadStakeData = async() =>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const user = await signer.getAddress();

        const contract = new ethers.Contract(
            stakingAddress,
            StakingABI,
            provider
        );

        const staked = await contract.stakedBalance(user);
        const reward = await contract.calculateReward(staked);

        setStakedBalance(ethers.formatEther(staked));
        setReward(ethers.formatEther(reward));
    };

    useEffect(()=>{
        loadStakeData();
    },[]);

    return(
        <div>
            <h2>Staking DApp</h2>

            <input
            type = "text"
            placeholder = "Enter Amount"
            value = {amount}
            onChange = {(e)=> setAmount(e.target.value)}
            />

            <br/>
            <br/>

            <button onClick ={approveTokens}>Approve</button>
            <button onClick ={stakeTokens}>Stake</button>
            <button onClick ={unstakeTokens}>Unstake</button>
            <button onClick ={loadStakeData}>Refresh</button>

            <hr/>

            <h3>
                Staked Balance : 
                {" "}
                {stakedBalance}
                {" "}
                MTK
            </h3>

            <h3>
                Reward :
                {" "}
                {reward}
                {" "}
                MTK
            </h3>
        </div>
    );
}

export default Staking;