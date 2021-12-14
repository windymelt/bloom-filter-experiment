import { BloomFilter } from "bloomfilter";
import stringRandom from "string-random";
import { encode } from "messagepack";
import { deflateSync } from "zlib";
import { Buffer } from "buffer";


console.log("items,length,type");
for (var ord = 1; ord < 1000000; ord *= 2) {
    const bloom = new BloomFilter(7_188_794, 10);
    for (var k = 0; k < ord; k++) {
        const randkey = stringRandom(100);
        bloom.add(randkey)
    }
    
    const array = [].slice.call(bloom.buckets),
    json = JSON.stringify(array);

    const mpacked = encode(json);
    const buf = Buffer.from(mpacked);
    const compressedBuf = deflateSync(buf);

    console.log(ord + "," + json.length + ",uncompressed");
    console.log(ord + "," + compressedBuf.byteLength + ",compressed")
}