import { BloomFilter } from "bloomfilter";
import stringRandom from "string-random";
import { encode } from "messagepack";
import { deflateSync } from "zlib";
import { Buffer } from "buffer";


for (var ord = 1; ord < 100000; ord *= 10) {
    const bloom = new BloomFilter(500000, 10);
    for (var k = 0; k < ord; k++) {
        const randkey = stringRandom(20);
        bloom.add(randkey)
    }
    
    const array = [].slice.call(bloom.buckets),
    json = JSON.stringify(array);

    const mpacked = encode(json);
    const buf = Buffer.from(mpacked);
    const compressedBuf = deflateSync(buf);

    console.log("JSON length of bloom filter with " + ord + " items: " + json.length + ", compressed: " + compressedBuf.byteLength);
}