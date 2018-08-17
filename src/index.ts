import * as cryptoJs from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (index:number, previousHash:string, data:string, timestamp: number):string => cryptoJs.SHA256(index + previousHash + data + timestamp).toString();


    constructor(index:number, hash:string, previousHash:string, data:string, timestamp:number){
        this.index =index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "202020202", "", "heloo", 1231231);

let blockchain:Block[] = [genesisBlock];

const getBlockchain = ():Block[] => blockchain;
const getLastestBlock = ():Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = ():number => Math.round(new Date().getTime()/1000);
const validateBlockStructure = (block:Block) : boolean => {
    return typeof block.index === "number"
     &&typeof block.data === "string"
      && typeof block.hash === "string" 
      && typeof block.previousHash === "string" 
      && typeof block.timestamp === "number";
}
const validateHash = (block:Block) : boolean => {
    const rightHash = Block.calculateBlockHash(block.index, block.previousHash, block.data, block.timestamp);
    if(block.hash === rightHash) {
        return true;
    }else {
        return false;
    }
}

const createNewBlock = (data:string):Block => {
    const previousBlock:Block = getLastestBlock();
    const nextIndex:number = previousBlock.index + 1;
    const nextTimeStamp:number = getNewTimeStamp();
    const nextHash:string = Block.calculateBlockHash(nextIndex, previousBlock.hash, data, nextTimeStamp);
    const newBlock:Block = new Block(nextIndex, nextHash, previousBlock.hash, data, nextTimeStamp);
    addBlock(newBlock);
    return newBlock;
}

const validateBlock = (candidateBlock:Block, previousBlock: Block) : boolean => {
    if (!validateBlockStructure(candidateBlock)) {
        return false;
    }else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    }else if(!validateHash(candidateBlock)){
        return false;
    }else{
        return true;
    }

}

const addBlock = (candidateBlock:Block) : void => {
    if(validateBlock(candidateBlock, getLastestBlock())){
        blockchain.push(candidateBlock)
    }
}

createNewBlock("second")
createNewBlock("third")
createNewBlock("fourth")

console.log(blockchain);


export{}