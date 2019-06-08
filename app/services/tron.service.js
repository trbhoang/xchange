const hdkey = require("hdkey"),
    { keccak256 } = require("js-sha3"),
    { encode: encodeBase58 } = require("bs58"),
    JsSHA = require("jssha"),
    { ec: EllipticCurve } = require("elliptic"),
    seed = "unable ordinary method rally neck knee trigger vote coffee guard pride child", // address TE7xK4ScGet7qvUw5CR4fEnRnpPMWzqFnq
    tronHdkey = hdkey.fromMasterSeed(seed),
    ADDRESS_PREFIX = "41";

module.exports = {
    generateAddress
};

function generateAddress(path) {
    const childkey = tronHdkey.derive(path),
        address = getAddressFromPublicKey(childkey.publicKey);

    return address;
}

function getSHA256(msgHex) {
    const shaObj = new JsSHA("SHA-256", "HEX");
    shaObj.update(msgHex);
    return shaObj.getHash("HEX");
}

function getTronPublicKeyHex(publicKey) {
    const ec = new EllipticCurve("secp256k1");
    const key = ec.keyFromPublic(publicKey.toString("hex"), "hex");
    const { x, y } = key.getPublic();
    const xHex = x.toString("hex").padStart(64, "0");
    const yHex = y.toString("hex").padStart(64, "0");
    return xHex + yHex;
}

function computeAddress(tronPublicHex) {
    const buffer = Buffer.from(tronPublicHex, "hex");
    const hash = keccak256(buffer).toString();
    return ADDRESS_PREFIX + hash.substring(24);
}

function getBase58CheckAddress(addressHex) {
    const checkSum = getSHA256(getSHA256(addressHex)).slice(0, 8);
    const buffer = Buffer.from(addressHex + checkSum, "hex");
    return encodeBase58(buffer);
}

function getAddressFromPublicKey(publicKey) {
    const tronPublicHex = getTronPublicKeyHex(publicKey);
    const address = computeAddress(tronPublicHex);
    return getBase58CheckAddress(address);
}
