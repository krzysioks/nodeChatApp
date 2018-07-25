const expect = require('expect');
const { generateMessage } = require('./message');

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
