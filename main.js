const Web3 = require('web3');
const config = require("./config.js");
const web3 = new Web3(config.web3provider)
const abiDecoder = require('abi-decoder');
const axios = require('axios')

const example_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"accounts","type":"address[]"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeMultipleAccountsFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"newValue","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"oldValue","type":"uint256"}],"name":"GasForProcessingUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newLiquidityWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldLiquidityWallet","type":"address"}],"name":"LiquidityWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"iterations","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claims","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastProcessedIndex","type":"uint256"},{"indexed":true,"internalType":"bool","name":"automatic","type":"bool"},{"indexed":false,"internalType":"uint256","name":"gas","type":"uint256"},{"indexed":true,"internalType":"address","name":"processor","type":"address"}],"name":"ProcessedDividendTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SendDividends","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateDividendTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_marketingWalletAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"blacklistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"buybackAndBurnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"dividendTokenBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendTracker","outputs":[{"internalType":"contract SHIBASTARTERDividendTracker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeMultipleAccountsFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gasForProcessing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountDividendsInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAccountDividendsInfoAtIndex","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClaimWait","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastProcessedIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfDividendTokenHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[4]","name":"addrs","type":"address[4]"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"totalSupply_","type":"uint256"},{"internalType":"uint256","name":"buybackAndBurnFee_","type":"uint256"},{"internalType":"uint256","name":"tokenRewardsFee_","type":"uint256"},{"internalType":"uint256","name":"rewardGamerFee_","type":"uint256"},{"internalType":"uint256","name":"rewardMiniGameFee_","type":"uint256"},{"internalType":"uint256","name":"liquidityFee_","type":"uint256"},{"internalType":"uint256","name":"marketingFee_","type":"uint256"},{"internalType":"uint256","name":"minimumTokenBalanceForDividends_","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"processDividendTracker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardGamerFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardMiniGameFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setLiquiditFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setMarketingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"}],"name":"setMarketingWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setSwapTokensAtAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setTokenRewardGamerFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setTokenRewardMiniGameFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setTokenRewardsFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenRewardsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBuyFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSellFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"claimWait","type":"uint256"}],"name":"updateClaimWait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateDividendTracker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateGasForProcessing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawableDividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

abiDecoder.addABI(example_abi);

var redis = require("redis");
const {createClient} = require("redis");
const {parse} = require("toml");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

async function is_token_in_db(token) {
    const client = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
        database: '2'
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    r = await client.GET(wallet.toLowerCase())
    await client.disconnect()
    return r != null
}

async function get_lower_bound() {
    const client = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
        database: '11'
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    r = await client.GET("lower_bound")
    await client.disconnect()
    return r
}

async function get_upper_bound() {
    const client = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
        database: '11'
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    r = await client.GET("upper_bound")
    await client.disconnect()
    return r
}

async function add_token_to_db(token) {
    const client = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
        database: '2'
    });
    token = token.toLowerCase()
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.SET(token.toLowerCase(), (Date.now() - (Date.now() % 1000)) / 1000)
    await client.disconnect()
}

async function get_token_stamp(token) {
    const client = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
        database: '2'
    });
    token = token.toLowerCase()
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    r = await client.GET(token.toLowerCase())
    await client.disconnect()
    return r
}

async function delete_token(token) {
    const client = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
        database: '2'
    });
    token = token.toLowerCase()
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.DEL(token.toLowerCase())
    await client.disconnect()
}

async function get_all_tokens() {
    const client = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
        database: '2'
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    r = await client.KEYS('*')
    await client.disconnect()
    return r
}

function hexToString(str)
{
    return Buffer.from(str , 'utf8').toString('hex');
}

async function parse_transaction(transaction) {
    try {
        transaction = await web3.eth.getTransaction(transaction)
        if (transaction['type'] == '0x0' && transaction['value'] == '0') {
                let contract = (await web3.eth.getTransactionReceipt(transaction['hash'])).contractAddress
                if(contract != null) {
                    await add_token_to_db(contract)
                }
        }
    }
    catch (e){
        console.log('Node error: parse transaction stage: ' + e)
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function temp_tokens_controller() {
    while(1) {
        let tokens = await get_all_tokens()
        for(let token in tokens) {
            nowTimestamp = (Date.now() - (Date.now() % 1000)) / 1000
            tokenStamp = await get_token_stamp(tokens[token])

            if((nowTimestamp - tokenStamp) / 3600 > 24) {
                await delete_token(tokens[token])
                console.log('deleted')
            }
        }
        await sleep(180000)
    }
}

async function process_block(block_number) {
    try {
        let block = await web3.eth.getBlock(block_number);

        for (let transaction in block['transactions']) {
            await parse_transaction(block['transactions'][transaction]);
        }
    }
    catch {
        console.log('Node error: process block stage')
    }
}

async function main() {
    temp_tokens_controller()
    let prev_block = await web3.eth.getBlockNumber();
    while (true) {
        try {
            current_block = await web3.eth.getBlockNumber();
        }
        catch {
            console.log('Node error: getting block stage')
        }
        if(current_block >= prev_block) {
            process_block(prev_block)
            console.log('Block number: ', prev_block)
            ++prev_block;
        }
    }
}

main()
