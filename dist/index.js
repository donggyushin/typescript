"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoJs = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, data, timestamp) => cryptoJs.SHA256(index + previousHash + data + timestamp).toString();
const genesisBlock = new Block(0, "202020202", "", "heloo", 1231231);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLastestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const validateBlockStructure = (block) => {
    return typeof block.index === "number"
        && typeof block.data === "string"
        && typeof block.hash === "string"
        && typeof block.previousHash === "string"
        && typeof block.timestamp === "number";
};
const validateHash = (block) => {
    const rightHash = Block.calculateBlockHash(block.index, block.previousHash, block.data, block.timestamp);
    if (block.hash === rightHash) {
        return true;
    }
    else {
        return false;
    }
};
const createNewBlock = (data) => {
    const previousBlock = getLastestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimeStamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(nextIndex, previousBlock.hash, data, nextTimeStamp);
    const newBlock = new Block(nextIndex, nextHash, previousBlock.hash, data, nextTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const validateBlock = (candidateBlock, previousBlock) => {
    if (!validateBlockStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (!validateHash(candidateBlock)) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (validateBlock(candidateBlock, getLastestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second");
createNewBlock("third");
createNewBlock("fourth");
console.log(blockchain);
//# sourceMappingURL=index.js.map