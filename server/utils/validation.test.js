const expect = require('expect');
const { isRealString } = require('./validation');

describe('validate room and user names', () => {
    it('should reject non-string values', () => {
        const testValue = 2;

        expect(isRealString(testValue)).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        const testValue = '      ';

        expect(isRealString(testValue)).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        const testValue = 'testUser';

        expect(isRealString(testValue)).toBeTruthy();
    });
});
