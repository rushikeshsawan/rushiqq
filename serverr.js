const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./smart contract/client/src/contracts/SimpleStorage.json');
const address = '0x8e8Ef3E7D09D1fE0683f9B782860Bb00e41DE660';
const privateKey = '4925f96bd005d94c76b3646593aba2615f4b65b197160bdf96ce9a586d41067e';
const infuraUrl = 'https://ropsten.infura.io/v3/cecc686c7c684ee981dd2961d36d084c';

//Hard way (web3#signTransaction() + web3#sendSignedTransaction())
const init1 = async () => {
    const web3 = new Web3(infuraUrl);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );

    const tx = myContract.methods.set_new_product(1234, "bname", "rcurrent", "soperation", parseInt(12), "color", "msize", "material", "coo");
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: myContract.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: networkId
        },
        privateKey
    );
    console.log(`Old data value: ${await myContract.methods.data().call()}`);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`New data value: ${await myContract.methods.data().call()}`);
}

//Slightly easier (web3#sendTransaction())
// const init2 = async () => {
//     try{
//   const web3 = new Web3(infuraUrl);
//   const networkId = await web3.eth.net.getId();
//   const myContract = new web3.eth.Contract(
//     MyContract.abi,
//     MyContract.networks[networkId].address
//   );
//   web3.eth.accounts.wallet.add(privateKey);

//   const tx = myContract.methods.set_warranty(12345);
// //   const tx = myContract.methods.get_product_details(1234).call().then(result => { console.log(result) } );
//   const gas = await tx.estimateGas({from: address});
//   const gasPrice = await web3.eth.getGasPrice();
//   const data = tx.encodeABI();
//   const nonce = await web3.eth.getTransactionCount(address);
//   const txData = {
//     from: address,
//     to: myContract.options.address,
//     data: data,
//     gas,
//     gasPrice,
//     nonce, 
//   };

// //   console.log(`Old data value: ${await myContract.methods.data().call()}`);
//   const receipt = await web3.eth.sendTransaction(txData);
// //   console.log(`Transaction hash: ${receipt.transactionHash}`);
// //   console.log("success",tx);
// //   console.log(`New data value: ${await myContract.methods.data().call()}`);
// }catch(e){
//     // console.log(JSON.parse(e));
// console.error(e);
// }
// }

// Easy way (Web3 + @truffle/hdwallet-provider)
const init3 = async () => {
    const provider = new Provider(privateKey, infuraUrl);
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    console.log("networkid->", networkId);
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );

    //   console.log(await myContract.methods.set_new_product(12345, "bname", "rcurrent", "soperation", parseInt(12), "color", "msize", "material", "coo").send({ from: address }));
    const receiptt= await myContract.methods.set_newbatch_product(100, parseInt(30000), "Amron", "testing", "testing", parseInt(12), "testing", "testing", "testing", "testing").send({ from: address }).then(result => {
        console.log(result);
    //     console.log("result->"+JSON.stringify(result));
    })
    .catch(error => { 
        console.log("error->", error.message); 
    });
    (async () => {
    // console.log(`Transaction hash: ${receiptt.transactionHash}`);
    console.log(`New data value: ${await myContract.methods.get_product_details(30050).call()}`);
    })();
    //   console.log(`Old data value: ${await myContract.methods.get_product_details(123456780).call()}`);
    // const receipt = await myContract.methods.set_warranty(12345).send({ from: address }).then(result => {
    //     (async () => {
    //     console.log(result);
    //     console.log(`Transaction hash: ${receipt.transactionHash}`);
    //     console.log(`New data value: ${await myContract.methods.get_product_details(12345).call()}`);
    //     })();
    // }).catch(error => { 
    //     //console.log("error->", error) 
    // });
    console.log("khatam");

}

init3();