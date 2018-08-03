const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const refText = 'text content';
        const refFrom = 'Boby';
        const { from, text, createdAt } = generateMessage(refFrom, refText);

        expect(from).toBe(refFrom);
        expect(text).toBe(refText);
        expect(typeof createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const refFrom = 'Boby';
        const refLat = 54;
        const refLong = 18;
        const { from, lat, long, createdAt } = generateLocationMessage(refFrom, refLat, refLong);

        expect(from).toBe(refFrom);
        expect(typeof lat).toBe('number');
        expect(lat).toBe(refLat);
        expect(typeof long).toBe('number');
        expect(long).toBe(refLong);
        expect(typeof createdAt).toBe('number');
    });
});
