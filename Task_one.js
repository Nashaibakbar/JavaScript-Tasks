const Web3 = require("web3")
let web3 = new Web3("https://mainnet.infura.io/v3/637a6ab08bce4397a29cbc97b4c83abf");
let contract_abi =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_oldRate","type":"uint256"}],"name":"BaseInterestUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"altQuantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"initiationTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"durationTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"address","name":"phnxContractAddress","type":"address"},{"indexed":false,"internalType":"address","name":"portalAddress","type":"address"}],"name":"StakeCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"address","name":"stakedToken","type":"address"},{"indexed":false,"internalType":"address","name":"portalAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"altQuantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"durationTimestamp","type":"uint256"}],"name":"Unstake","type":"event"},{"inputs":[],"name":"getTotalrewardTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxStakedQuantity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phnxContractAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ratio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setPheonixContractAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_altQuantity","type":"uint256"},{"internalType":"uint256","name":"_days","type":"uint256"}],"name":"stakeALT","outputs":[{"internalType":"uint256","name":"rewardAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakeDays","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakerBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakerData","outputs":[{"internalType":"uint256","name":"altQuantity","type":"uint256"},{"internalType":"uint256","name":"initiationTimestamp","type":"uint256"},{"internalType":"uint256","name":"durationTimestamp","type":"uint256"},{"internalType":"uint256","name":"rewardAmount","type":"uint256"},{"internalType":"address","name":"staker","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_expiredTimestamps","type":"uint256[]"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstakeALT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_quantity","type":"uint256"}],"name":"updateQuantity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"updateRatio","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_time","type":"uint256"}],"name":"updateTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_stakeDays","type":"uint256"}],"name":"updatestakeDays","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contract = new web3.eth.Contract(contract_abi,"0xFa70F492D9f4fc28C8D6b9e65eac0B0AA363AF7F");


exports.getEvents = async(StartBlock)=>{
    var blockNumbers=[];
    var timeStamps=[];
    var matchBlockNumbers=[];
    var matchTimeStamps=[];
	await contract.getPastEvents(
        "StakeCompleted",
        {
          fromBlock: StartBlock, 
          toBlock: "latest",
        },
        (err, events) => {
            
            for(i=0;i<events.length;i++){
            blockNumbers[i]=events[i].blockNumber;
            timeStamps[i]=events[i].returnValues.initiationTimestamp;
            }
            for(i=0;i<events.length-1;i++){
                // if(blockNumbers[i]==blockNumbers[i+1])
                // {
                //     matchBlockNumbers.push(blockNumbers[i+1]);
                // }
                if(timeStamps[i]==timeStamps[i+1])
                {
                    matchTimeStamps.push(timeStamps[i]);
                    matchTimeStamps.push(timeStamps[i+1]);
                    matchBlockNumbers.push(blockNumbers[i]);
                    matchBlockNumbers.push(blockNumbers[i+1]);
                }

             
            }
            for(let i=0;i<matchBlockNumbers.length;i++){
            console.log("BlockNumber:"+matchBlockNumbers[i], "TimeStamp:",matchTimeStamps[i])
            }
        }
      );
}

exports.getEvents(0);
